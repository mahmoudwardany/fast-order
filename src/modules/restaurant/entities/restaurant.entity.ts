import { AbstractEntity } from 'src/shared/abstract-db';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurants')
export class Restaurant extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  logo: string;
}
