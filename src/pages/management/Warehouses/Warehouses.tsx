import { Card } from '@mui/material';
import WarehousesTable from './WarehousesTable';
import { subDays } from 'date-fns';
import { useGetWarehouses } from 'src/hooks/api/management/warehouse';

function Warehouses() {
  const { data } = useGetWarehouses();

  return (
    <Card>
      <WarehousesTable warehouses={data.items} />
    </Card>
  );
}

export default Warehouses;
