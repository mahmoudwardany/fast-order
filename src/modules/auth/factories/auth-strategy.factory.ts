import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailAuthStrategy } from '../strategies/email-auth.strategy';
import { GoogleAuthStrategy } from '../strategies/google-auth.strategy';
import {
  ILoginStrategy,
  IRegisterStrategy,
} from '../interface/auth-strategy.interface';
import { AuthProvider } from 'src/utils/enum/auth-provider.enum';

@Injectable()
export class AuthFactories {
  constructor(
    private readonly emailAuthStrategy: EmailAuthStrategy,
    private readonly googleAuthStrategy: GoogleAuthStrategy,
  ) {}

  getRegisterStrategy(): IRegisterStrategy {
    return this.emailAuthStrategy;
  }

  getLoginStrategy(provider: AuthProvider): ILoginStrategy {
    switch (provider) {
      case AuthProvider.LOCAL:
        return this.emailAuthStrategy;
      case AuthProvider.GOOGLE:
        return this.googleAuthStrategy;
      default:
        throw new BadRequestException('Invalid auth provider');
    }
  }
}
