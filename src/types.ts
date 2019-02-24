import { Connection, Repository } from 'typeorm'
import { 
  Cabang, 
  User, 
  Barbermen, 
  Jasa, 
  Sesi, 
  Picture, 
  Item, 
  Media,
  PembayaranSesi,
  Pembelian, 
  Penggunaan, 
  Penjualan, 
  SesiState,
  Transaksi 
} from './models';

export interface Repo {
  cabang: Repository<Cabang>;
  barbermen: Repository<Barbermen>;
  jasa: Repository<Jasa>;
  sesi: Repository<Sesi>;
  user: Repository<User>;
  transaksi: Repository<Transaksi>;
  item: Repository<Item>;
  pembelian: Repository<Pembelian>;
  penjualan: Repository<Penjualan>;
  penggunaan: Repository<Penggunaan>;
  pembayaranSesi: Repository<PembayaranSesi>;
}

export interface Box {
  connection: Connection;
  repo: Repo;
}

export enum SimpleTime {
  TODAY='TODAY',
  THIS_WEEK='THIS_WEEK',
  THIS_MONTH='THIS_MONTH',
  THIS_YEAR='THIS_YEAR'
}