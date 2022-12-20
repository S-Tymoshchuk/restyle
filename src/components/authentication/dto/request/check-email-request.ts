import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailRequest {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
