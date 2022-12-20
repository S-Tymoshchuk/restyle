import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordRequest {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
