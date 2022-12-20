import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BasketRepository } from '@components/basket/basket.repository';
import { CreateBasketRequest } from '@components/basket/dto/request/create-basket-request';
import { Sequelize } from 'sequelize-typescript';
import { BasketItemsResponse } from '@components/basket/dto/basket-items-response';

@Injectable()
export class BasketService {
  private readonly logger = new Logger(BasketService.name);
  constructor(
    private readonly basketRepository: BasketRepository,
    private sequelize: Sequelize,
  ) {}

  async createOrder(
    basket: CreateBasketRequest,
    userId: string,
  ): Promise<void> {
    this.logger.log('Start transaction create basket and basket items');

    await this.sequelize.transaction(async (t) => {
      try {
        const createBasket = await this.basketRepository.createBasket(
          {
            tailorId: basket.tailorId,
            customerId: userId,
          },
          t,
        );
        await this.basketRepository.createItems(
          basket.items,
          createBasket.id,
          t,
        );
      } catch (e) {
        throw new BadRequestException('Something went wrong, try again');
      }
    });
    this.logger.log('Create order successful');
  }

  async getBasketById(
    basketId: string,
    userId: string,
  ): Promise<BasketItemsResponse[]> {
    const basket = await this.basketRepository.getBasketById(basketId, userId);

    if (!basket) {
      throw new ForbiddenException(
        "You don't have permission to get this basket!",
      );
    }
    return basket;
  }

  async removeBasketItem(itemId: string, userId: string): Promise<void> {
    const { basket } = await this.basketRepository.getBasketByItem(itemId);

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    if (String(userId) !== String(basket.customerId)) {
      throw new ForbiddenException(
        "You don't have permission to delete this basket!",
      );
    }
    return this.basketRepository.removeBasketItem(itemId);
  }
}
