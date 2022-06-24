import WarehousesTable from './WarehousesTable';
import { SuspenseBox } from 'src/components/styled/suspense';

function Warehouses() {
  return (
    <SuspenseBox>
      <WarehousesTable />
    </SuspenseBox>
  );
}

export default Warehouses;
