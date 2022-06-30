import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.PRODUCT.PUT,
    mutationFn: (variables: {
      original: Product;
      changes: Partial<
        Omit<
          Product,
          '_id' | 'createdBy' | 'createdAt' | 'updatedAt' | 'updatedBy'
        >
      >;
    }) => ProductService.updateProduct(variables.original, variables.changes),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.PRODUCT.GET)
  });
};
