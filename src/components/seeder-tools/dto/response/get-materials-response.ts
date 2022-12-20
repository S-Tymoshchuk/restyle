import { ApiProperty } from '@nestjs/swagger';
import { ServiceApiResponse } from '@components/core/response/abstract-service-api';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

class Material {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class GetMaterialsResponse extends ServiceApiResponse<Material[]> {
  @ApiModelProperty({ type: Material, isArray: true })
  data: Material[];
}
