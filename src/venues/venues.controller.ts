import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateVenueDto } from 'src/dtos/venue.dto';
import { VenuesService } from './venues.service';
import { CreateShowDto } from 'src/dtos/show.dto';

@Controller('venues')
@ApiBearerAuth()
export class VenueController {
  constructor(private venueService: VenuesService) {}

  @Post()
  public async createVenueAsync(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.createVenue(createVenueDto);
  }

  @Get()
  public async getVenuesAsync() {
    return this.venueService.getVenues();
  }

  @Get(':id')
  public async getVenueByIdAsync(@Param('id') id: string) {
    return this.venueService.getVenueById(+id);
  }

  @Delete(':id')
  public async deleteVenueAsync(@Param('id') id: string) {
    await this.venueService.deleteVenue(+id);
  }

  @Post(':id/shows')
  public async createVenueShowAsync(
    @Param('id') id: string,
    @Body() dto: CreateShowDto,
  ) {
    return await this.venueService.createVenueShow(+id, dto);
  }

  @Get(':id/shows')
  public async getVenueShowsAsync(@Param('id') id: string) {
    return await this.venueService.getVenueShows(+id);
  }
}
