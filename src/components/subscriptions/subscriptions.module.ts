import { Module } from '@nestjs/common';
import { SubscriptionsService } from '@components/subscriptions/subscriptions.service';
import { SubscriptionsController } from '@components/subscriptions/subscriptions.controller';
import { StripeModule } from '@utils/stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
