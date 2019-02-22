import { User } from './User';
import { Cabang } from './Cabang';
import { Barbermen } from './Barbermen';
import { Picture } from './Picture';
import { Item } from './Item';
import { Jasa } from './Jasa';
import { SesiState, Sesi } from './Sesi';
import { Media } from './Media';
import { PembayaranSesi } from './PembayaranSesi';
import { Pembelian } from './Pembelian';
import { Penjualan } from './Penjualan';
import { Penggunaan } from './Penggunaan';
import { Transaksi } from './Transaksi';
import { seed } from './seed'
import { 
  createConnection,
  Connection,
  DatabaseType
} from 'typeorm'
import { Box } from '../types'

async function createDbConnection() : Promise<Box> {
  const dbConfig: any = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    synchronize: process.env.DB_SYNC == 'true',
    logging: process.env.DB_LOG == 'true'
  }

  // const dbConfig = {
  //   host: "localhost",
  //   username: "root",
  //   password: "",
  //   port: 3306,
  //   database: "manliest-db-2",
  //   synchronize: false,
  //   logging: true
  // }

  console.log(dbConfig)
  const entities = [
    Cabang,
    User,
    Barbermen,
    Jasa,
    Sesi,
    Picture,
    Item,
    Media,
    Pembelian,
    Penjualan,
    Penggunaan,
    PembayaranSesi,
    Transaksi
  ]

  const dbConn: Connection = await createConnection({
    ...dbConfig,
    entities
  })

  const cabang = dbConn.getRepository<Cabang>(Cabang);
  const barbermen = dbConn.getRepository<Barbermen>(Barbermen);
  return {
    connection: dbConn,
    repo: {
      cabang: (await dbConn.getRepository<Cabang>(Cabang)),
      barbermen: (await dbConn.getRepository<Barbermen>(Barbermen)),
      jasa: (await dbConn.getRepository<Jasa>(Jasa)),
      sesi: (await dbConn.getRepository<Sesi>(Sesi)),
      user: (await dbConn.getRepository<User>(User)),
      item: (await dbConn.getRepository<Item>(Item)),
      pembayaranSesi: (await dbConn.getRepository<PembayaranSesi>(PembayaranSesi)),
      pembelian: (await dbConn.getRepository<Pembelian>(Pembelian)),
      penjualan: (await dbConn.getRepository<Penjualan>(Penjualan)),
      penggunaan: (await dbConn.getRepository<Penggunaan>(Penggunaan)),
      transaksi: (await dbConn.getRepository<Transaksi>(Transaksi))
    }
  }
}

export {
  Cabang,
  User,
  Barbermen,
  Picture,
  Item,
  Jasa,
  Sesi,
  SesiState,
  Media,
  Pembelian,
  Penjualan,
  Penggunaan,
  Transaksi,
  PembayaranSesi,
  seed,
  createDbConnection
}