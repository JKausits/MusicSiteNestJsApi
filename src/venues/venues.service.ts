import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowDto, PrivateShowDto } from 'src/dtos/show.dto';
import { CreateVenueDto, VenueDto } from 'src/dtos/venue.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  public async createVenue(data: CreateVenueDto): Promise<VenueDto> {
    return this.prisma.venue.create({ data, select: { id: true, name: true } });
  }

  public async getVenues(): Promise<VenueDto[]> {
    return await this.prisma.venue.findMany({
      select: { id: true, name: true },
      orderBy: {
        name: 'asc',
      },
    });
  }

  public async getVenueById(id: number): Promise<VenueDto> {
    const venue = await this.prisma.venue.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      select: { id: true, name: true },
    });

    if (venue == null) throw new NotFoundException();

    return venue;
  }

  public async deleteVenue(id: number): Promise<boolean> {
    const result = await this.prisma.venue.delete({
      where: { id },
      select: { id: true },
    });

    return result != null;
  }

  public async createVenueShow(
    id: number,
    dto: CreateShowDto,
  ): Promise<PrivateShowDto> {
    await this.getVenueById(id);

    return await this.prisma.show.create({
      data: {
        ...dto,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        venueId: id,
      },
      select: {
        id: true,
        rate: true,
        startAt: true,
        endAt: true,
        venue: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async getVenueShows(id: number): Promise<PrivateShowDto[]> {
    await this.getVenueById(id);

    return await this.prisma.show.findMany({
      where: {
        venueId: {
          equals: id,
        },
      },
      select: {
        id: true,
        rate: true,
        startAt: true,
        endAt: true,
        venue: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
