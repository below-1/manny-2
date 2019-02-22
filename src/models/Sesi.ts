import { 
  Entity, PrimaryGeneratedColumn,
  Column, JoinColumn,
  ManyToOne, OneToMany,
  ManyToMany, JoinTable,
  ChildEntity } from 'typeorm';
import { Cabang } from './Cabang';
import { Jasa } from './Jasa';
import { Barbermen } from './Barbermen';
import { User } from './User';
import { Transaksi } from './Transaksi';

export enum SesiState {
  SCHEDULED = 'SCHEDULED',
  ONGOING = 'ONGOING',
  DONE = 'DONE',
  CANCELED = 'CANCELED'
}

@Entity()
export class Sesi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keterangan: string;

  @Column('timestamp')
  scheduledStartTime: Date;

  @Column('timestamp')
  scheduledEndTime: Date;

  @Column('timestamp')
  executionStartTime: Date;

  @Column('timestamp')
  executionEndTime: Date;

  @Column('enum', { enum: SesiState, nullable: false, default: SesiState.SCHEDULED })
  state: SesiState;

  @Column('int')
  rating: number;

  @Column({ type: 'int', nullable: false })
  idBarbermen: number;
  @ManyToOne(type => Barbermen, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'idBarbermen' })
  barbermen: Barbermen;

  @Column({ type: 'int', nullable: false })
  idForUser: number;
  @ManyToOne(type => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'idForUser' })
  forUser: User;

  @ManyToMany(type => Jasa)
  @JoinTable()
  listJasa: Jasa[];

  @Column('timestamp')
  waktu: Date;

  @Column({ type: 'int', nullable: false })
  idCabang: number;

  @Column({ type: 'int', nullable: false })
  idAddedBy: number;

  @ManyToOne(type => Cabang)
  @JoinColumn({ name: 'idCabang' })
  cabang: Cabang;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'idAddedBy' })
  addedBy: User;
}