import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Materials {
  @ApiProperty()
  @IsNumber()
  materialId: number;

  @ApiProperty()
  @IsNumber()
  percentage: number;
}

export class Prices {
  @ApiProperty()
  @IsNumber()
  clothingItemId: number;

  @ApiProperty()
  @IsNumber()
  serviceId: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class Images {
  @ApiProperty()
  @IsString()
  coverImg: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  previousImgWork: string[];
}

export class Services {
  @ApiProperty()
  @IsNumber()
  serviceTypeId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  time: string;

  @ApiProperty()
  @IsString()
  subscriptionId: string;

  @ApiProperty({ type: Prices, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Prices)
  prices: Prices[];
}

export class SignupTailorRequest {
  @ApiProperty()
  @IsString()
  businessName: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ type: Images })
  @ValidateNested()
  @IsObject()
  @Type(() => Images)
  images: Images;

  @ApiProperty({ type: Services, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Services)
  services: Services[];

  @ApiProperty({ type: Materials, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Materials)
  materialsPrice: Materials[];
}
