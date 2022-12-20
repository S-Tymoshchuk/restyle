import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TOOLS_TAG } from '@docs/tags';
import { TOOL_PATH } from '@docs/path';
import { SeederService } from '@components/seeder-tools/seeder.service';
import { GetMaterialsResponse } from '@components/seeder-tools/dto/response/get-materials-response';
import { GetClothingItemsResponse } from '@components/seeder-tools/dto/response/get-clothing-items-response';
import { GetServicesResponse } from '@components/seeder-tools/dto/response/get-services-response';
import { GetServicesTypeResponse } from '@components/seeder-tools/dto/response/get-services-type-response';

@ApiTags(TOOLS_TAG)
@Controller(TOOL_PATH)
export class SeederControllers {
  constructor(private readonly seederService: SeederService) {}

  @Get('materials')
  @ApiOkResponse({ type: GetMaterialsResponse })
  getMaterials() {
    return this.seederService.getMaterials();
  }

  @Get('clothing-items')
  @ApiOkResponse({ type: GetClothingItemsResponse })
  getClothingItems() {
    return this.seederService.getClothingItems();
  }

  @Get('services')
  @ApiOkResponse({ type: GetServicesResponse })
  getServices() {
    return this.seederService.getServices();
  }

  @Get('services-type')
  @ApiOkResponse({ type: GetServicesTypeResponse })
  getTypeServices() {
    return this.seederService.getTypeServices();
  }
}
