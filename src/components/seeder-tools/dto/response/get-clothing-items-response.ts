import { ApiProperty } from '@nestjs/swagger';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

class ClothingItems {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class GetClothingItemsResponse extends ServiceApiResponse<
  ClothingItems[]
> {
  @ApiModelProperty({ type: ClothingItems, isArray: true })
  data: ClothingItems[];
}
