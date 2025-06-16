import { User } from 'src/modules/users/entities/user.entity';
import { AbstractEntity } from 'src/shared/abstract-db';
import { RequestStatus } from 'src/utils/enum/request-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('restaurant_request')
export class RestaurantRequest extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  restaurantName: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column({ nullable: true })
  adminComment: string;

  approve() {
    this.status = RequestStatus.APPROVED;
  }

  reject() {
    this.status = RequestStatus.REJECTED;
  }
}
