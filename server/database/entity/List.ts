import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie_list')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: string;
}