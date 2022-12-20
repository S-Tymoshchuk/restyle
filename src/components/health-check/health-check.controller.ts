import { Controller, Get, Logger } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HEALTH_TAG } from '@docs/tags';
import { HEALTH_PATH } from '@docs/path';

@ApiTags(HEALTH_TAG)
@Controller(HEALTH_PATH)
@Controller()
export class HealthCheckController {
  private readonly logger = new Logger(HealthCheckController.name);

  @Get()
  @ApiResponse({ status: 200 })
  getHealth() {
    this.logger.log('Health check');
    return {};
  }
}
