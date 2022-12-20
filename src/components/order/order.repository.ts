import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderRequest } from '@components/order/dto/create-order-request';
import { OrderEntities } from '@components/order/entities/order.entities';
import { UserEntities } from '@components/users/entities/user.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { BasketEntities } from '@components/basket/entities/basket.entities';
import { BasketRepository } from '@components/basket/basket.repository';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderEntities)
    private readonly orderModel: typeof OrderEntities,
    @InjectModel(UserEntities)
    private readonly userModel: typeof UserEntities,
    private readonly basketRepository: BasketRepository,
  ) {}

  createOrder(body: CreateOrderRequest): Promise<OrderEntities> {
    return this.orderModel.create({ basketId: body.basketId });
  }

  checkTailorOrUser(userId: string): Promise<UserEntities> {
    return this.userModel.findOne({
      where: {
        id: userId,
      },
      include: [{ model: TailorEntities }],
    });
  }

  async getOrdersByUser(filter): Promise<OrderEntities[]> {
    const order = await this.orderModel.findAll({
      include: [{ model: BasketEntities, where: { ...filter } }],
    });

    const basketValue = await Promise.all(
      order.map(async (el) => this.basketRepository.getBasketById(el.basketId)),
    );

    return order.map((el, i) => ({
      ...el.get({ plain: true }),
      basket: basketValue[i][0],
    }));
  }
}
