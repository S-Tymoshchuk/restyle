import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBasketItemsRequest {
  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  materialId: number[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  clothingItemId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  serviceId: number[];
}

export class CreateBasketRequest {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  tailorId: string;

  @ApiProperty({ type: CreateBasketItemsRequest, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateBasketItemsRequest)
  items: CreateBasketItemsRequest[];
}
