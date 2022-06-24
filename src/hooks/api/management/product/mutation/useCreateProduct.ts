import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.PRODUCT.ADD,
    mutationFn: (variables: {
      brand: string;
      brandModel: string;
      image_urls: string[];
      colors: string[];
      createdBy: string;
    }) =>
      ProductService.createProduct(
        variables.brand,
        variables.brandModel,
        variables.image_urls,
        variables.colors,
        variables.createdBy
      ),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.PRODUCT.GET)
  });
};
