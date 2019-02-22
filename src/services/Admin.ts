import moment from 'moment'
import { 
  User,
  Jasa,
  Sesi,
  SesiState,
  PembayaranSesi
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

  public async adminNewVisit (payload: any) {
    console.log(chalk.bgBlue("Admin is "), this.admin)
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

}

export const generateAdminModel = ({ user, box, ...rest } : IAdminServiceInput) =>  new AdminModel(box, user)