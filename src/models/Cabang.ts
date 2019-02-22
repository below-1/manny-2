import { 
  Entity, PrimaryGeneratedColumn,
  Column, JoinColumn,
  ManyToOne, OneToMany,
  ManyToMany, JoinTable,
  RelationId } from 'typeorm';
import { Barbermen } from './Barbermen';
import { User }  from './User'

  @Entity()
  export class Cabang {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nama: string;
  
    @Column()
    alamat: string

    @OneToMany(type => Barbermen, barbermen => barbermen.cabang)
    listBarbermen: Barbermen[];

    @OneToMany(type => User, user => user.adminCabang)
    listAdmin: User[]
  }