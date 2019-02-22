import { 
  Entity, 
  PrimaryGeneratedColumn,
  Column, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Cabang } from './Cabang'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ nullable: true })
  kontak: string;

  @Column()
  kategori: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'int', nullable: true })
  idAdminCabang: number;

  @ManyToOne(type => Cabang, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idAdminCabang' })
  adminCabang: Cabang
}