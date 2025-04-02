import { SalesTrendDataType } from './sales-trend-data-type';
import { OrdersType } from './orders-type';

export interface Table1TypeERPProducts {
  sku: string;
  imageUrl: string;
  productName: string;
  category: string;
  rating: number;
  grossPrice: number;
  netPrice: number;
  salesTrendData: SalesTrendDataType[];
  orders: OrdersType[];
}
