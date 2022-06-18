import { Card } from '@mui/material';
import { Warehouse } from 'src/models/crypto_order';
import WarehousesTable from './WarehousesTable'
import { subDays } from 'date-fns';

function Warehouses() {
  const warehouses: Warehouse[] = [
    {
      id: '1',
      orderDetails: 'Depot 1',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 34,
      amount: 56787,
      cryptoCurrency: 'ETH',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Depot 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: '23M3UOG65G8K',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'Depot 3',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'F6JHK65MS818',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'Depot 1',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'Depot 1',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '6',
      orderDetails: 'Depot 1',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: '6RS606CBMKVQ',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '7',
      orderDetails: 'Depot 1',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: '479KUYHOBMJS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1212',
      amountCrypto: 2,
      amount: 234234,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '8',
      orderDetails: 'Depot 12',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Paypal Account',
      sourceDesc: '*** 1111',
      amountCrypto: 3,
      amount: 34544,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '9',
      orderDetails: 'Depot 1',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Bank Account',
      sourceDesc: '*** 2222',
      amountCrypto: 1,
      amount: 123843,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '10',
      orderDetails: 'Depot 9',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: '17KRZHY8T05M',
      sourceName: 'Depot 9',
      sourceDesc: "John's Cardano Wallet",
      amountCrypto: 765,
      amount: 7567,
      cryptoCurrency: 'ADA',
      currency: '$'
    }
  ];

  return (
    <Card>
      <WarehousesTable warehouses={warehouses} />
    </Card>
  );
}

export default Warehouses;
