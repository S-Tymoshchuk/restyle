import { Price } from '@components/subscriptions/dto/response/get-price-response';

export class PriceMapperResponse {
  static mapToResponsePrice(price): Price {
    return price
      ? {
          id: price.id,
          unitAmount: price.unit_amount / 100,
          unitAmountDecimal: Number(price.unit_amount_decimal) / 100,
          fee: price.unit_amount === 1500 ? 5 : 0,
        }
      : null;
  }
}
