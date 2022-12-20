import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderRequest } from '@components/order/dto/create-order-request';
import { OrderService } from '@components/order/order.service';
import { ApiTags } from '@nestjs/swagger';
import { ORDER_TAG } from '@docs/tags';
import { ORDER_PATH } from '@docs/path';
import { AuthJWT } from '@decorators/auth-jwt.decorator';
import { User } from '@decorators/user.decorator';
import { IReqUser } from '@decorators/auth.user.data';

@AuthJWT()
@ApiTags(ORDER_TAG)
@Controller(ORDER_PATH)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: CreateOrderRequest) {
    return this.orderService.createOrder(body);
  }

  @Get()
  getOrdersByUser(@User() user: IReqUser) {
    return this.orderService.getOrdersByUser(user.id);
  }
}
