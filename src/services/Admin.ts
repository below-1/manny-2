import moment from 'moment'
import { 
  User,
  Jasa,
  Sesi,
  SesiState,
  PembayaranSesi,
  Penjualan,
  Pembelian,
  Penggunaan,
  Transaksi,
  Item
} from '../models'
import { Box } from '../types'
import chalk from 'chalk'

interface IAdminServiceInput {
  user: User;
  authToken: string;
  box: Box;
}

class AdminModel {

  constructor (private box: Box, private admin: User) {

    if (this.admin && (this.admin.kategori == 'admin' || this.admin.kategori == 'owner') ) {
      // Do nothing
    } else {
      this.admin = null
    }
  }

  public async newVisit (payload: any) {
    // console.log(chalk.bgBlue("Admin is "), this.admin)
    if (!this.admin) {
      throw new Error('Admin is undefined')
    }
    return await this.box.connection.transaction(async em => {
      const userRepo = em.getRepository<User>(User)
      const jasaRepo = em.getRepository<Jasa>(Jasa)
      const sesiRepo = em.getRepository<Sesi>(Sesi)

      let newUser: User = userRepo.create({
        nama: payload.namaUser,
        kategori: 'anon'
      })
      newUser = await userRepo.save(newUser)

      const jasa = await jasaRepo.findByIds(payload.jasa)
      let totalBayar
      let waktu = moment().toDate()

      if (payload.waktu) {
        waktu = payload.waktu
      }

      if (payload.totalBayar) {
        totalBayar = payload.totalBayar
      } else {
        totalBayar = jasa.map(it => it.harga).reduce((prev, curr) => prev + curr, 0)
      }

      let sesi = sesiRepo.create({
        keterangan: payload.keterangan,
        waktu,
        idBarbermen: payload.barbermen,
        idAddedBy: this.admin.id,
        state: SesiState.DONE,
        idCabang: this.admin.idAdminCabang,
        idForUser: newUser.id
      })
      sesi = await sesiRepo.save(sesi)

      let pembayaranSesi = new PembayaranSesi()
      pembayaranSesi.idCabang = this.admin.idAdminCabang
      pembayaranSesi.idAddedBy = this.admin.id
      pembayaranSesi.idSesi = sesi.id
      pembayaranSesi.waktu = waktu
      pembayaranSesi.nominal = totalBayar
      pembayaranSesi.keterangan = payload.keterangan
      await em.save<PembayaranSesi>(pembayaranSesi)

      return sesi
    })
  }

  public async addItem (payload) {
    if (!this.admin) {
      throw new Error('Admin is undefined')
    }
    let { namaItem, ...rest } = payload
    let item = this.box.repo.item.create({
      ...rest,
      nama: namaItem,
      idCabang: this.admin.idAdminCabang
    })
    return await this.box.repo.item.save( item )
  }

  public async removeItem(id) {
    if (!this.admin) {
      throw new Error('Admin is undefined')
    }
    await this.box.repo.item.delete(id)
    return id
  }

  public async sell(payload) {
    if (!this.admin) {
      throw new Error('Admin is undefined')
    }
    return await this.box.connection.transaction(async em => {
      // 
      const userRepo = em.getRepository<User>(User)
      const penjualanRepo = em.getRepository<Penjualan>(Penjualan)
      const itemRepo = em.getRepository<Item>(Item)

      let newUser: User = userRepo.create({
        nama: payload.namaUser,
        kategori: 'anon'
      })
      newUser = await userRepo.save(newUser)

      let waktu, nominal

      if (payload.waktu) { 
        waktu = payload.waktu
      } else {
        waktu = moment().toDate()
      }

      if (payload.nominal) {
        nominal = payload.nominal
      } else {
        let item = await itemRepo.findOne(payload.idItem)
        nominal = payload.jumlah * item.hargaJual
      }

      let penjualan = penjualanRepo.create({
        idAddedBy: this.admin.id,
        idItem: payload.idItem,
        jumlah: payload.jumlah,
        idCabang: this.admin.idAdminCabang,
        waktu,
        nominal,
        keterangan: payload.keterangan
      })

      return await penjualanRepo.save(penjualan)
    })
  }

  public async buy(payload) {
    if (!this.admin) {
      throw new Error('Admin is undefined')
    }

    let waktu
    if (payload.waktu) {
      waktu = payload.waktu
    } else {
      waktu = moment().toDate()
    }
    let pembelian = this.box.repo.pembelian.create({
      ...payload,
      waktu,
      idAddedBy: this.admin.id,
      idCabang: this.admin.idAdminCabang
    })
    pembelian = await this.box.repo.pembelian.save(pembelian)
    return pembelian
  }

  public async use(payload) {
    if (!this.admin) {
      throw new Error('Admin is undefined')
    }
    let waktu
    if (payload.waktu) {
      waktu = payload.waktu
    } else {
      waktu = moment().toDate()
    }
    let penggunaan = this.box.repo.penggunaan.create({
      ...payload,
      waktu,
      nominal: 0,
      idAddedBy: this.admin.id,
      idCabang: this.admin.idAdminCabang
    })

    return await this.box.repo.penggunaan.save(penggunaan)
  }

}

export const generateAdminModel = ({ user, box, ...rest } : IAdminServiceInput) =>  new AdminModel(box, user)