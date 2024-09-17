import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateVenueDto } from 'src/dtos/venue.dto';

@Controller('venues')
@ApiBearerAuth()
export class VenueController {
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createVenueAsync(@Body() createVenueDto: CreateVenueDto) {
    return createVenueDto;
  }
}
