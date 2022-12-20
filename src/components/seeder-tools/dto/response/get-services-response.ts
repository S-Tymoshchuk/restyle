import { ApiProperty } from '@nestjs/swagger';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

class ServicesMock {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}

export class GetServicesResponse extends ServiceApiResponse<ServicesMock[]> {
  @ApiModelProperty({ type: ServicesMock, isArray: true })
  data: ServicesMock[];
}
