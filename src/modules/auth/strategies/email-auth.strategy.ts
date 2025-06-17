import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import {
  IRegisterStrategy,
  ILoginStrategy,
} from '../interface/auth-strategy.interface';
import { UsersService } from 'src/modules/users/users.service';
import { AuthProvider } from 'src/utils/enum/auth-provider.enum';
import { generateAccessToken } from 'src/utils/logic/generate-token.util';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class EmailAuthStrategy implements IRegisterStrategy, ILoginStrategy {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<User> {
    const { email, password, name, phone } = data;

    const userExists = await this.usersService.findOneByEmail(email);
    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
      provider: AuthProvider.LOCAL,
      phone,
    });
    return user;
  }

  async login(
    data: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = data;
    const user = await this.usersService.findOneByEmail(email);

    if (!user || user.provider !== AuthProvider.LOCAL) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return generateAccessToken(this.jwtService, user);
  }
}
