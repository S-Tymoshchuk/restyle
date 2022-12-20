import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { CreateUser } from '@components/users/dto/response/create-user-response';

export class Login extends CreateUser {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class LoginResponse extends ServiceApiResponse<Login> {
  @ApiModelProperty({ type: Login })
  data: Login;
}
