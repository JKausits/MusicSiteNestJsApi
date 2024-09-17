import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
