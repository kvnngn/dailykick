import { WarehouseService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';
import { usePaginatedQuery } from 'src/hooks/api/base';

export default () =>
  usePaginatedQuery(
    QUERY_KEY.MANAGEMENT.WAREHOUSE.GET,
    WarehouseService.getWarehouses,
    {
      suspense: true,
      useErrorBoundary: true
    }
  );
