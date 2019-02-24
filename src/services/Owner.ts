import { 
  Between,
  MoreThan
} from 'typeorm'
import { 
  Box,
  SimpleTime
} from '../types'
import {
  User
} from '../models'
import { toDateRange } from './utils'

export class OwnerModel {

  public constructor (private box: Box, private owner: User) {
    if (!this.owner || this.owner.kategori != 'owner') {
      this.owner = null
    }
  }

  public async createCabang(payload) {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    let cabang = this.box.repo.cabang.create({
      ...payload
    })
    return await this.box.repo.cabang.save(cabang)
  }

  public async updateCabang(id, payload) {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    let cabang = await this.box.repo.cabang.findOne(id)
    cabang.nama = payload.nama
    cabang.alamat = payload.alamat
    return await this.box.repo.cabang.save(cabang)
  }

  public async removeCabang(id) {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    await this.box.repo.cabang.delete(id)
    return id
  }

  public async registerAdmin(payload) {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    let user = this.box.repo.user.create({
      nama: payload.nama,
      username: payload.username,
      password: payload.password,
      idAdminCabang: payload.cabang,
      kategori: 'admin'
    })
    return await this.box.repo.user.save(user)
  }

  public async listCabang() {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    return await this.box.repo.cabang.find()
  }

  public async listItemInCabang (cabang: number) {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    return await this.box.repo.item.find({
      where: {
        idCabang: cabang
      }
    })
  }

  public async pemasukanInCabang (cabang: number, time: SimpleTime) {
    if (!this.owner) {
      throw new Error("Owner is undefiend")
    }
    let { start, end } = toDateRange(time)
    let items = await this.box.repo.transaksi.find({
      where: {
        idCabang: cabang,
        nominal: MoreThan(0),
        waktu: Between(start, end)
      }
    })
    let total = items.map(it => it.nominal).reduce((prev, curr) => prev + curr, 0)
    let result = {
      items,
      total
    }
    return result
  }
}


export const generateOwnerModel = (box: Box, user: User) => new OwnerModel(box, user)