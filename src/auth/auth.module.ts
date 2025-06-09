import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from 'src/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { GooglePassportStrategy } from './strategies/google-passport.strategy';
import { AuthFactories } from './factories/auth-strategy.factory';
import { EmailAuthStrategy } from './strategies/email-auth.strategy';
import { GoogleAuthStrategy } from './strategies/google-auth.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GooglePassportStrategy,
    AuthFactories,
    EmailAuthStrategy,
    GoogleAuthStrategy,
  ],
})
export class AuthModule {}
