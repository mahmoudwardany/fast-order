import { User } from 'src/users/entities/user.entity';
import { GoogleProfileDto } from '../dto/google-profile.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

export interface ILocalRegisterStrategy {
  register(data: RegisterDto): Promise<User>;
}

export interface IEmailLoginStrategy {
  login(data: LoginDto): Promise<{ accessToken: string; refreshToken: string }>;
}

export interface IGoogleLoginStrategy {
  login(
    data: GoogleProfileDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
