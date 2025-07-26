import { MenuItem } from 'src/modules/menu-items/entities/menu-item.entity';
import { AbstractEntity } from 'src/shared/abstract-db';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('restaurants')
export class Restaurant extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  tenantId: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant, {
    cascade: true,
  })
  menuItems: MenuItem[];
}
