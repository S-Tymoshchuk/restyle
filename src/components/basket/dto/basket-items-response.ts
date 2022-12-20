export interface BasketItemsResponse {
  basketId: string;
  businessName: string;
  basketItemId: string;
  services: Array<{ name: string; price: number; id: number }>;
  total: number;
  clothItemName: string;
  totalWithPercentage: number;
  clothingItemId: number;
}
