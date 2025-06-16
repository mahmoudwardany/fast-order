import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthFactories } from './factories/auth-strategy.factory';
import { GoogleProfileDto } from './dto/google-profile.dto';
import {
  IEmailLoginStrategy,
  IGoogleLoginStrategy,
} from './interface/auth-strategy.interface';
import { User } from '../users/entities/user.entity';
import { AuthProvider } from 'src/utils/enum/auth-provider.enum';

@Injectable()
export class AuthService {
  constructor(private readonly authFactories: AuthFactories) {}

  async register(payload: RegisterDto): Promise<User> {
    if (payload.provider !== AuthProvider.LOCAL) {
      throw new BadRequestException(
        'Registration is only supported for local provider',
      );
    }
    const provider = this.authFactories.getRegisterStrategy();
    return provider.register(payload);
  }

  async loginLocal(payload: LoginDto): Promise<{ accessToken: string }> {
    const strategy = this.authFactories.getLoginStrategy(
      AuthProvider.LOCAL,
    ) as IEmailLoginStrategy;
    return strategy.login(payload);
  }

  async loginGoogle(
    profile: GoogleProfileDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const strategy = this.authFactories.getLoginStrategy(
      AuthProvider.GOOGLE,
    ) as IGoogleLoginStrategy;
    return strategy.login(profile);
  }
}
