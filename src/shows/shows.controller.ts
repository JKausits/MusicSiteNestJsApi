import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetShowsParams } from 'src/dtos/show.dto';
import { Public } from 'src/auth/guards/public.guard';

@Controller('shows')
@ApiBearerAuth()
export class ShowsController {
  constructor(private showService: ShowsService) {}

  @Delete(':id')
  public async deleteShowAsync(@Param('id') id: string) {
    return await this.showService.deleteShow(+id);
  }

  @Get()
  @Public()
  public async getPublicShowsAsync(@Query() query: GetShowsParams) {
    return await this.showService.getPublicShows(query);
  }
}
