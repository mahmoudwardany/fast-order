import { UserRole } from 'src/users/user-role.enum';

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}
