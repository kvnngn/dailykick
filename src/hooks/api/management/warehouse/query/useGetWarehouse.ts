import { useQuery } from 'react-query';
import { WarehouseService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default (id: string) =>
  useQuery(
    QUERY_KEY.MANAGEMENT.WAREHOUSE.GET,
    () => WarehouseService.getWarehouse(id),
    {
      suspense: true,
      useErrorBoundary: true
    }
  );
