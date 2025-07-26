import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { AbstractEntity } from 'src/shared/abstract-db';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  DeleteDateColumn,
} from 'typeorm';

@Entity('menu_items')
export class MenuItem extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  restaurantId: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @DeleteDateColumn()
  deletedAt: Date;
}
