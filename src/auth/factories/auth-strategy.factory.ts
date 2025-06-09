import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthProvider } from '../auth-provider.enum';
import { EmailAuthStrategy } from '../strategies/email-auth.strategy';
import { GoogleAuthStrategy } from '../strategies/google-auth.strategy';
import {
  IEmailLoginStrategy,
  IGoogleLoginStrategy,
  ILocalRegisterStrategy,
} from '../interface/auth-strategy.interface';

@Injectable()
export class AuthFactories {
  constructor(
    private readonly emailAuthStrategy: EmailAuthStrategy,
    private readonly googleAuthStrategy: GoogleAuthStrategy,
  ) {}

  getRegisterStrategy(): ILocalRegisterStrategy {
    return this.emailAuthStrategy;
  }

  getLoginStrategy(
    provider: AuthProvider,
  ): IEmailLoginStrategy | IGoogleLoginStrategy {
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
