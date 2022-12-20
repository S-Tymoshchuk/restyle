import { TailorEntities } from '@components/users/entities/tailor.entities';
import { TailorMaterialsEntities } from '@components/users/entities/tailor-materials.entities';
import { Op } from 'sequelize';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { TailorPriceEntities } from '@components/users/entities/tailor-price.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { BasketItemsInterface } from '@components/basket/dto/basket-items-interface';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { BasketItemsResponse } from '@components/basket/dto/basket-items-response';

export const basketHelper = async (
  tailorEntity: typeof TailorEntities,
  basketInfo: BasketItemsInterface,
): Promise<BasketItemsResponse> => {
  const item = await tailorEntity.findOne({
    attributes: ['businessName'],
    where: { id: basketInfo.tailorId },
    include: [
      {
        model: TailorMaterialsEntities,
        where: {
          materialId: { [Op.in]: basketInfo.itemsMaterial },
        },
        attributes: ['percentage'],
      },
      {
        model: TailorServiceEntities,
        attributes: ['id'],
        include: [
          {
            model: TailorPriceEntities,
            where: { serviceId: { [Op.in]: basketInfo.itemsService } },
            include: [
              { model: ClothingItemsEntities, attributes: ['name'] },
              { model: ServicesEntities, attributes: ['id', 'name'] },
            ],
            attributes: ['price', 'serviceId'],
          },
        ],
      },
    ],
  });

  const percentage = item.tailorMaterials.reduce((acc, cur) => {
    acc += cur.percentage;
    return acc;
  }, 0);

  const services = item.tailorServices.map((el) =>
    el.prices.map((el2) => ({
      name: el2.clothingItem.name,
      price: el2.price,
      id: el2.serviceId,
    })),
  )[0];

  const total = services.reduce((acc, cur) => {
    acc += cur.price;
    return acc;
  }, 0);

  return {
    basketId: basketInfo.id,
    basketItemId: basketInfo.basketItemId,
    businessName: basketInfo.businessName,
    clothItemName: basketInfo.clothingItem,
    clothingItemId: basketInfo.clothingItemId,
    services,
    total,
    totalWithPercentage: (total * percentage) / 100 + total,
  };
};
