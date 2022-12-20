import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class UserSearchRequest {
  @ApiProperty()
  @IsString()
  postCode: string;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  clothingItems: number[];

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  materialsId: number[];

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  servicesId: number[];

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  serviceTypes: number[];
}
