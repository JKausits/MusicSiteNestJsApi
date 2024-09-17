import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UserDto {
  id: number;
  email: string;

  public static FromEntity(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
