import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BasketId {
  @ApiProperty()
  @IsString()
  basketId: string;
}
