import { ApiProperty } from '@nestjs/swagger';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

class ServicesTypeMock {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class GetServicesTypeResponse extends ServiceApiResponse<
  ServicesTypeMock[]
> {
  @ApiModelProperty({ type: ServicesTypeMock, isArray: true })
  data: ServicesTypeMock[];
}
