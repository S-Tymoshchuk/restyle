import { Controller, Get } from '@nestjs/common';
import { SubscriptionsService } from '@components/subscriptions/subscriptions.service';
import { SUBSCRIPTION_TAG } from '@docs/tags';
import { SUBSCRIPTION_PATH } from '@docs/path';
import { GetPricesResponse } from '@components/subscriptions/dto/response/get-price-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(SUBSCRIPTION_TAG)
@Controller(SUBSCRIPTION_PATH)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOkResponse({ type: GetPricesResponse })
  @Get('prices')
  getPrices() {
    return this.subscriptionsService.getPrices();
  }
}
