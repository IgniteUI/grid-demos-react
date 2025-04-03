import { DeliveryType } from './delivery-type';
import { OrderInformationType } from './order-information-type';

export interface OrdersType {
  orderId: number;
  status: string;
  delivery: DeliveryType;
  orderInformation: OrderInformationType;
}
