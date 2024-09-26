import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenueController } from './venues/venues.controller';
import { VenueModule } from './venues/venues.module';
import { VenuesService } from './venues/venues.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ShowsModule } from './shows/shows.module';

@Module({
  imports: [
    VenueModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ShowsModule,
  ],
  controllers: [AppController, VenueController],
  providers: [
    AppService,
    VenuesService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
