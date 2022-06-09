export type WarehouseStatus = 'completed' | 'pending' | 'failed';

export interface Warehouse {
  id: string;
  status: WarehouseStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
