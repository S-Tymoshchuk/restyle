import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderRequest {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  basketId: string;
}
