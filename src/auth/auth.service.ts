import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserDto } from 'src/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await argon2.verify(user.password, password)))
      return UserDto.FromEntity(user);

    return null;
  }

  async login(user: UserDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
