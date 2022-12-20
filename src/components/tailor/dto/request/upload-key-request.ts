import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserImagesTypeEnum } from '@components/users/enums/user-images-type.enum';

export class UploadKeyRequest {
  @ApiProperty({ required: false })
  @IsEnum(UserImagesTypeEnum)
  @IsString()
  key: string;
}
