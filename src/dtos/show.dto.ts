import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, Max, Min } from 'class-validator';
import { VenueDto } from './venue.dto';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateShowDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(99999.99)
  rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endAt: Date;
}

export class PrivateShowDto {
  id: number;
  rate: Decimal;
  startAt: Date;
  endAt: Date;
  venue: VenueDto;
}

export class PublicShowDto {
  id: number;
  startAt: Date;
  endAt: Date;
  venue: VenueDto;
}

export class GetShowsParams {
  @ApiProperty({ required: false })
  startAt?: Date;

  @ApiProperty({ required: false })
  endAt?: Date;
}
