import { useMutation, useQueryClient } from 'react-query';
import { WarehouseService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.WAREHOUSE.ADD,
    mutationFn: (variables: { name: string; createdBy: string }) =>
      WarehouseService.createWarehouse(variables.name, variables.createdBy),
    onSuccess: () =>
      client.invalidateQueries(QUERY_KEY.MANAGEMENT.WAREHOUSE.GET)
  });
};
