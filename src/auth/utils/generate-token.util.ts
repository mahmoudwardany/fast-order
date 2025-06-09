import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';

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
