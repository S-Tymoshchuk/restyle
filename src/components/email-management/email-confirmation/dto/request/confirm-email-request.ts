import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
