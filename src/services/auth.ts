import { Repository } from 'typeorm'
import { User } from '../models'

const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.APP_SECRET

export const encodeToken = (repo: Repository<User>) => async (id: number) => {
  let user = await repo.findOne(id)
  if (!user) {
    throw new Error('Can not find user')
  }
  let token = jwt.sign({
    id: user.id,
    username: user.username,
    nama: user.nama,
    password: user.password,
    kategori: user.kategori,
    idAdminCabang: user.idAdminCabang
  }, APP_SECRET)
  return token
}

export const decodeToken = async (token: string) => {
  if (token) {
    let user
    try {
      user = jwt.verify(token, APP_SECRET, {
        expiresIn: "30 days"
      })
      return user
    } catch (err) {
      throw new Error("Can't decode token")
    }
  }
}

const authFactory = (repo: Repository<User>) => async (username, password) => {
  return await repo.findOne({
    where: {
      username: username,
      password: password
    }
  })
}


