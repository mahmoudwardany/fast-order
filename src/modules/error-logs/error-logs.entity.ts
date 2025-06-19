import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('error_logs')
export class ErrorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusCode: number;

  @Column()
  message: string;

  @Column({ nullable: true })
  stack?: string;

  @Column({ nullable: true })
  path?: string;

  @Column({ nullable: true })
  method?: string;

  @Column({ type: 'json', nullable: true })
  context?: any;

  @CreateDateColumn()
  createdAt: Date;
}
