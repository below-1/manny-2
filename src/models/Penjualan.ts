import * as torm from 'typeorm';
import { User } from './User';
import { Transaksi } from './Transaksi';
import { Item } from './Item';

@torm.ChildEntity()
export class Penjualan extends Transaksi {
  @torm.Column()
  jumlah: number;

  @torm.Column({ type: 'int', nullable: false })
  idItem: number;

  @torm.ManyToOne(type => Item, { onDelete: 'CASCADE' })
  @torm.JoinColumn({ name: 'idItem' })
  item: Item;
  
  @torm.Column('int')
  idForUser: number;

  @torm.ManyToOne(type => User)
  @torm.JoinColumn({ name: 'idForUser' })
  forUser: User;
}