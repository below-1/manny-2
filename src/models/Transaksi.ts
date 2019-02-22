import * as torm from 'typeorm';
import { Cabang } from './Cabang';
import { User } from './User'
import { Column } from 'typeorm';

@torm.Entity()
@torm.TableInheritance({ column: { type: "varchar", name: "type" } })
export class Transaksi {
  @torm.PrimaryGeneratedColumn()
  id: number;
  
  @torm.Column()
  type: string;

  @torm.Column('double', { default: 0 })
  nominal: number;

  @torm.Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  waktu: Date;

  @torm.Column({ default: '' })
  keterangan: string;

  @torm.Column({ type: 'int', nullable: false })
  idCabang: number;

  @torm.Column({ type: 'int', nullable: false })
  idAddedBy: number;

  @torm.ManyToOne(type => Cabang)
  @torm.JoinColumn({ name: 'idCabang' })
  cabang: Cabang;

  @torm.ManyToOne(type => User)
  @torm.JoinColumn({ name: 'idAddedBy' })
  addedBy: User;
}
