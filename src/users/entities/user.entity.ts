import { AbstractEntity } from 'src/shared/abstract-db';
import { Column, PrimaryColumn } from 'typeorm';
import { UserRole } from '../user-role.enum';

export class User extends AbstractEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
