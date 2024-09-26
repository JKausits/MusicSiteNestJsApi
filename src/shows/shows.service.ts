import { Injectable } from '@nestjs/common';
import { GetShowsParams, PublicShowDto } from 'src/dtos/show.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  public async deleteShow(id: number): Promise<boolean> {
    const result = await this.prisma.show.delete({
      where: { id },
      select: { id: true },
    });

    return result != null;
  }

  public async getPublicShows(
    params: GetShowsParams,
  ): Promise<PublicShowDto[]> {
    return await this.prisma.show.findMany({
      where: {
        startAt: {
          gte: params.startAt,
        },
        endAt: {
          lte: params.endAt,
        },
      },
      select: {
        id: true,
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
