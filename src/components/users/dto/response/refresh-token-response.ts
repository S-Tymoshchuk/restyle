import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';

export class RefreshToken {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class RefreshTokenResponse extends ServiceApiResponse<RefreshToken> {
  @ApiModelProperty({ type: RefreshToken })
  data: RefreshToken;
}
