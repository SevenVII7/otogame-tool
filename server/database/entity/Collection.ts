import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('collection')
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: string;
}