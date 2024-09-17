import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';
import {
  DefaultUserConfiguration,
  EnvironmentConfiguration,
} from './configuration';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private configService: ConfigService<EnvironmentConfiguration>,
  ) {}

  onApplicationBootstrap() {
    this.seedDefaultUser();
  }

  private async seedDefaultUser() {
    if ((await this.prisma.user.count()) > 0) return;

    console.log('Seeding Default User');
    const defaultUser =
      this.configService.get<DefaultUserConfiguration>('defaultUser');
    this.userService.createUser(defaultUser.email, defaultUser.password);
  }
}
