import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@components/order/order.repository';
import { CreateOrderRequest } from '@components/order/dto/create-order-request';
import { OrderEntities } from '@components/order/entities/order.entities';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  createOrder(body: CreateOrderRequest): Promise<OrderEntities> {
    return this.orderRepository.createOrder(body);
  }

  async getOrdersByUser(userId: string): Promise<OrderEntities[]> {
    const checkTailorOrUser = await this.orderRepository.checkTailorOrUser(
      userId,
    );
    const paramFilter = checkTailorOrUser.tailor
      ? { tailorId: userId }
      : { customerId: userId };

    return this.orderRepository.getOrdersByUser(paramFilter);
  }
}
