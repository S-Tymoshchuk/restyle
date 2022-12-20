import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class Price {
  @ApiProperty()
  id: string;

  @ApiProperty()
  unitAmount: number;

  @ApiProperty()
  unitAmountDecimal: number;

  @ApiProperty()
  fee: number;
}

export class GetPricesResponse extends ServiceApiResponse<Price> {
  @ApiModelProperty({ type: Price, isArray: true })
  data: Price;
}
