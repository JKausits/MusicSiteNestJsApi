import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
    });
  }

  async createUser(email: string, password: string) {
    password = await argon2.hash(password);

    return await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password,
      },
    });
  }
}
