import { useQuery } from 'react-query';
import { ProductService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default (id: string) =>
  useQuery(
    QUERY_KEY.MANAGEMENT.PRODUCT.GET,
    () => ProductService.getProduct(id),
    {
      suspense: true,
      useErrorBoundary: true
    }
  );
