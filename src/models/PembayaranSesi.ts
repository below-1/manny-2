import * as torm from 'typeorm';
import { Transaksi } from './Transaksi';
import { Sesi } from './Sesi'
import { 
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';

@torm.ChildEntity()
export class PembayaranSesi extends Transaksi {
  @Column('int', { nullable: false })
  idSesi: number;

  @OneToOne(type => Sesi)  
  @JoinColumn({ name: 'idSesi' })
  sesi;
}