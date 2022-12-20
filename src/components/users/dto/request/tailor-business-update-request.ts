import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TailorBusinessUpdateRequest {
  @ApiProperty()
  @IsString()
  businessName: string;

  @ApiProperty()
  @IsString()
  address: string;
}
