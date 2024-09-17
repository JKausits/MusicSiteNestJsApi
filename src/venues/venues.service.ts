import { Injectable } from '@nestjs/common';
import { Venue } from '@prisma/client';
import { CreateVenueDto } from 'src/dtos/venue.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  public async createVenue(data: CreateVenueDto): Promise<Venue> {
    return this.prisma.venue.create({ data });
  }
}
