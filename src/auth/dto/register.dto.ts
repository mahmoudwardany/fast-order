import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  override password: string;
}
