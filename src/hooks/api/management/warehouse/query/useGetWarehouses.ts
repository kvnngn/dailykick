import { WarehouseService } from 'src/api/services';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useQuery(
    QUERY_KEY.MANAGEMENT.WAREHOUSE.GET,
    () => WarehouseService.getWarehouses(),
    { suspense: true, useErrorBoundary: true }
  );
