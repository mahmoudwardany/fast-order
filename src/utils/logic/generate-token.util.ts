import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/modules/auth/interface/jwt-payload.interface';
import { User } from 'src/modules/users/entities/user.entity';


export const generateAccessToken = (jwtService: JwtService, user: User) => {
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwtService.sign(payload);
  const refreshToken = jwtService.sign(payload, { expiresIn: '7d' });
  return {
    accessToken,
    refreshToken,
  };
};
