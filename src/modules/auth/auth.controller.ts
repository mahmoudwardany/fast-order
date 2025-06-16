import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { GoogleProfileDto } from './dto/google-profile.dto';
import { AuthProvider } from 'src/utils/enum/auth-provider.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    if (payload.provider !== AuthProvider.LOCAL) {
      throw new BadRequestException(
        'Registration is only supported for local provider',
      );
    }
    return this.authService.register(payload);
  }

  @Post('login/email')
  async loginLocal(@Body() payload: LoginDto) {
    return this.authService.loginLocal(payload);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new BadRequestException('No user data provided by Google');
    }

    const profile = req.user as GoogleProfileDto;
    const { accessToken, refreshToken } =
      await this.authService.loginGoogle(profile);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.json({
      accessToken,
      refreshToken,
      profile,
    });
  }
}
