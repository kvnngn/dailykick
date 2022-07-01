import { useMutation, useQueryClient } from 'react-query';
import { WarehouseService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.WAREHOUSE.ADD,
    mutationFn: (variables: {
      original: Warehouse;
      changes: Partial<
        Omit<
          Warehouse,
          '_id' | 'createdBy' | 'createdAt' | 'lastUpdated' | 'lastUpdatedBy'
        >
      >;
    }) =>
      WarehouseService.updateWarehouse(variables.original, variables.changes),
    onSuccess: () =>
      client.invalidateQueries(QUERY_KEY.MANAGEMENT.WAREHOUSE.GET)
  });
};
