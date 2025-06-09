import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { AuthProvider } from '../auth-provider.enum';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.provider === AuthProvider.LOCAL)
  password?: string;

  @IsNotEmpty()
  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @IsString()
  @IsOptional()
  name?: string; // تصحيح النوع

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.provider === AuthProvider.GOOGLE)
  googleId?: string;
}
