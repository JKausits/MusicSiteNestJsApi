import { Body, Controller, Post } from '@nestjs/common';
import { CreateVenueDto } from 'src/dtos/venue.dto';

@Controller('venues')
export class VenueController {
  @Post()
  public async createVenueAsync(@Body() createVenueDto: CreateVenueDto) {
    return createVenueDto;
  }
}
