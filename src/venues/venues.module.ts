import { Module } from '@nestjs/common';
import { VenueController } from './venues.controller';
import { VenuesService } from './venues.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VenueController],
  providers: [VenuesService, PrismaService],
})
export class VenueModule {}
