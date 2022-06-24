import { ProductService } from 'src/api/services';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'src/constants';

export default () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.PRODUCT.DELETE,
    mutationFn: (variables: { id: string }) =>
      ProductService.deleteProduct(variables.id),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.PRODUCT.GET)
  });
};
