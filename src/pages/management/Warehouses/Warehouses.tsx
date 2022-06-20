import WarehousesTable from './WarehousesTable';
import { SuspenseBox } from 'src/components/styled/suspense';

function Warehouses() {
  return (
    <SuspenseBox mt={8}>
      <WarehousesTable />
    </SuspenseBox>
  );
}

export default Warehouses;
