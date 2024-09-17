import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenueController } from './venues/venues.controller';
import { VenueModule } from './venues/venues.module';
import { VenuesService } from './venues/venues.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [VenueModule],
  controllers: [AppController, VenueController],
  providers: [AppService, VenuesService, PrismaService],
})
export class AppModule {}
