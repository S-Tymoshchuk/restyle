import { ApiProperty } from '@nestjs/swagger';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  role: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  phone: string;
}

export class CreateUserResponse extends ServiceApiResponse<CreateUser> {
  @ApiModelProperty({ type: CreateUser })
  data: CreateUser;
}
