import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Services } from '@components/authentication/dto/request/signup-tailor-request';

export class TailorServiceUpdateRequest {
  @ApiProperty({ type: Services, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Services)
  services: Services[];
}
