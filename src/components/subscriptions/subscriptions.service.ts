import { Injectable } from '@nestjs/common';
import { StripeService } from '@utils/stripe/stripe.service';
import { PriceMapperResponse } from '@components/subscriptions/mapper/price-mapper-response';
import { Price } from '@components/subscriptions/dto/response/get-price-response';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly stripeService: StripeService) {}

  async getPrices(): Promise<Price[]> {
    return await this.stripeService
      .getPrices()
      .then((res) =>
        res ? res.map(PriceMapperResponse.mapToResponsePrice) : [],
      );
  }
}
