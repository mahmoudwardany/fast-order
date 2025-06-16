import { UserRole } from 'src/modules/users/user-role.enum';

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}
