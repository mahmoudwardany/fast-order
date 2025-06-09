import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '../../config/config.service';
import { AuthProvider } from '../auth-provider.enum';
import { GoogleProfileDto } from '../dto/google-profile.dto';

@Injectable()
export class GooglePassportStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['openid', 'email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    if (!profile.emails || !profile.emails[0]?.value) {
      return done(
        new BadRequestException('Email not provided by Google'),
        null,
      );
    }
    const user: GoogleProfileDto = {
      email: profile.emails[0].value,
      name:
        `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim() ||
        'Unknown User',
      googleId: profile.id,
      provider: AuthProvider.GOOGLE,
      picture: profile.photos?.[0]?.value,
    };

    done(null, user);
  }
}
