import { Box } from '../types'
import {
  User
} from '../models'

export class OwnerModel {

  public constructor (private box: Box, private owner: User) {}

  public async createCabang(payload) {
    let cabang = this.box.repo.cabang.create({
      ...payload
    })
    return await this.box.repo.cabang.save(cabang)
  }

  public async updateCabang(id, payload) {
    let cabang = await this.box.repo.cabang.findOne(id)
    cabang.nama = payload.nama
    cabang.alamat = payload.alamat
    return await this.box.repo.cabang.save(cabang)
  }

  public async removeCabang(id) {
    await this.box.repo.cabang.delete(id)
    return id
  }

  public async registerAdmin(payload) {
    let user = this.box.repo.user.create({
      nama: payload.nama,
      username: payload.username,
      password: payload.password,
      idAdminCabang: payload.cabang,
      kategori: 'admin'
    })
    return await this.box.repo.user.save(user)
  }
}


export const generateOwnerModel = (box: Box, user: User) => new OwnerModel(box, user)