import { Module } from '@nestjs/common';
import { initAppModules } from './init/app-modules';
import { UsersModule } from '@components/users/users.module';
import { AuthenticationModule } from '@components/authentication/authentication.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from '@components/core/interceptors/transform-response.interceptor';
import { SeederModule } from '@components/seeder-tools/seeder.module';
import { SubscriptionsModule } from '@components/subscriptions/subscriptions.module';
import { EmailManagementModule } from '@components/email-management/email-management.module';
import { TailorModule } from '@components/tailor/tailor.module';
import { HealthCheckModule } from '@components/health-check/health-check.module';
import { BasketModule } from '@components/basket/basket.module';
import { OrderModule } from '@components/order/order.module';
import { ReviewModule } from '@components/review/review.module';

@Module({
  imports: [
    ...initAppModules,
    HealthCheckModule,
    UsersModule,
    AuthenticationModule,
    SeederModule,
    SubscriptionsModule,
    EmailManagementModule,
    TailorModule,
    BasketModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
