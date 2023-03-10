import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-08-01',
    });
  }

  getPrices() {
    return this.stripe.prices.list({ active: true }).then((res) => res.data);
  }

  getProduct() {
    return this.stripe.products.list();
  }
}
