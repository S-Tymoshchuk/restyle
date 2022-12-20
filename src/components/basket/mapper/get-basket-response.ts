import { BasketItemsInterface } from '@components/basket/dto/basket-items-interface';

export class GetBasketResponse {
  static getBasket(basket): BasketItemsInterface[] {
    return basket.basketItems.map((el) => ({
      tailorId: basket.tailorId,
      id: basket.id,
      basketItemId: el.id,
      businessName: basket.tailor.businessName,
      clothingItem: el.clothingItem.name,
      itemsMaterial: el.itemsMaterial.map((el) => el.materialId),
      itemsService: el.itemsService.map((el) => el.serviceId),
      clothingItemId: el.clothingItem.id,
    }));
  }
}
