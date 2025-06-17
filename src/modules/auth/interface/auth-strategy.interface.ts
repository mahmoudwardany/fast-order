import { User } from 'src/modules/users/entities/user.entity';
import { GoogleProfileDto } from '../dto/google-profile.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

export interface IRegisterStrategy {
  register(data: RegisterDto): Promise<User>;
}

export interface ILoginStrategy {
  login(
    data: LoginDto | GoogleProfileDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
