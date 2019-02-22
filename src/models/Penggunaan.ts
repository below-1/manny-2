import * as torm from 'typeorm';
import { Transaksi } from './Transaksi';
import { Item } from './Item';

@torm.ChildEntity()
export class Penggunaan extends Transaksi {
  @torm.Column()
  jumlah: number;

  @torm.Column({ type: 'int', nullable: false })
  idItem: number;

  @torm.ManyToOne(type => Item, { onDelete: 'CASCADE' })
  @torm.JoinColumn({ name: 'idItem' })
  item: Item;
}