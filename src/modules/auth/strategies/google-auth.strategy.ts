import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleProfileDto } from '../dto/google-profile.dto';
import { AuthProvider } from 'src/utils/enum/auth-provider.enum';
import { generateAccessToken } from 'src/utils/logic/generate-token.util';
import { ILoginStrategy } from '../interface/auth-strategy.interface';

@Injectable()
export class GoogleAuthStrategy implements ILoginStrategy {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    data: GoogleProfileDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, name, googleId } = data;

    let user = await this.usersService.findOneByEmail(email);

    if (user && user.provider !== AuthProvider.GOOGLE) {
      throw new UnauthorizedException(
        'This email is registered via a different provider.',
      );
    }

    if (!user) {
      user = await this.usersService.create({
        email,
        name,
        password: null,
        provider: AuthProvider.GOOGLE,
        phone: null,
        googleId,
      });
    }

    return generateAccessToken(this.jwtService, user);
  }
}
