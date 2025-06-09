import { AbstractEntity } from 'src/shared/abstract-db';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role.enum';
import { AuthProvider } from 'src/auth/auth-provider.enum';

@Entity('user')
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: AuthProvider })
  provider: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
