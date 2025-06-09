import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsPhoneNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../user-role.enum';
import { AuthProvider } from 'src/auth/auth-provider.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('EG')
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @IsOptional()
  @IsString()
  googleId?: string;
}
