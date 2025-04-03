import { OrderInformationType } from './order-information-type';
import { DeliveryType } from './delivery-type';

export interface OrdersType {
  orderId: number;
  status: string;
  delivery: DeliveryType;
  orderInformation: OrderInformationType;
}
