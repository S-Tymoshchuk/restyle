import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderEntities } from '@components/order/entities/order.entities';
import { OrderController } from '@components/order/order.controller';
import { OrderService } from '@components/order/order.service';
import { OrderRepository } from '@components/order/order.repository';
import { UserEntities } from '@components/users/entities/user.entities';
import { BasketModule } from '@components/basket/basket.module';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderEntities, UserEntities]),
    BasketModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
