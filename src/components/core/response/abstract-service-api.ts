import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export abstract class ServiceApiResponse<T> {
  abstract get data(): T;

  @ApiModelProperty({ type: Boolean })
  success: boolean;
}
