import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BasketEntities } from '@components/basket/entities/basket.entities';
import { CreateBasketInterface } from '@components/basket/dto/request/create-basket.interface';
import { BasketItemMaterialEntities } from '@components/basket/entities/basket-item-material.entities';
import { BasketItemEntities } from '@components/basket/entities/basket-item.entities';
import { BasketItemServiceEntities } from '@components/basket/entities/basket-item-service.entities';
import { CreateBasketItemsRequest } from '@components/basket/dto/request/create-basket-request';
import { Transaction } from 'sequelize';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { GetBasketResponse } from '@components/basket/mapper/get-basket-response';
import { basketHelper } from '@components/basket/helpers/basket-helper';
import { BasketItemsResponse } from '@components/basket/dto/basket-items-response';

@Injectable()
export class BasketRepository {
  constructor(
    @InjectModel(BasketEntities)
    private readonly basketModel: typeof BasketEntities,
    @InjectModel(BasketItemEntities)
    private readonly basketItemModel: typeof BasketItemEntities,
    @InjectModel(TailorEntities)
    private readonly tailorModel: typeof TailorEntities,
  ) {}

  createBasket(
    createBasket: CreateBasketInterface,
    t: Transaction,
  ): Promise<BasketEntities> {
    return this.basketModel.create(createBasket, { transaction: t });
  }

  async createItems(
    items: CreateBasketItemsRequest[],
    basketId: string,
    t: Transaction,
  ): Promise<void> {
    await Promise.all(
      items.map((el) =>
        this.basketItemModel.create(
          {
            clothingItemId: el.clothingItemId,
            basketId,
            itemsMaterial: el.materialId.map((material) => ({
              materialId: material,
            })),
            itemsService: el.serviceId.map((service) => ({
              serviceId: service,
            })),
          },
          {
            include: [
              { model: BasketItemMaterialEntities },
              { model: BasketItemServiceEntities },
            ],
            transaction: t,
          },
        ),
      ),
    );
  }

  async getBasketById(
    basketId: string,
    customerId?: string,
  ): Promise<BasketItemsResponse[]> {
    const filter = customerId ? { id: basketId, customerId } : { id: basketId };
    const basketInfo = await this.basketModel
      .findOne({
        where: { ...filter },
        include: [
          { model: TailorEntities },
          {
            model: BasketItemEntities,
            attributes: ['id'],
            include: [
              { model: ClothingItemsEntities },
              { model: BasketItemMaterialEntities },
              { model: BasketItemServiceEntities },
            ],
          },
        ],
      })
      .then((res) =>
        res ? GetBasketResponse.getBasket(res.get({ plain: true })) : [],
      );
    return await Promise.all(
      basketInfo.map(async (el) => basketHelper(this.tailorModel, el)),
    );
  }

  async removeBasketItem(itemId: string): Promise<void> {
    const basketItem = await this.basketItemModel.findOne({
      where: {
        id: itemId,
      },
    });
    await basketItem.destroy();
  }

  getBasketByItem(itemId: string): Promise<BasketItemEntities> {
    return this.basketItemModel.findOne({
      where: { id: itemId },
      include: [{ model: BasketEntities }],
    });
  }
}
