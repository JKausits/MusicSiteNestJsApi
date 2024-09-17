import { Module } from '@nestjs/common';
import { VenueController } from './venues.controller';

@Module({
  controllers: [VenueController],
})
export class VenueModule {}
