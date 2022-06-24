import { ProductService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';
import { usePaginatedQuery } from 'src/hooks/api/base';

export default () =>
  usePaginatedQuery(
    QUERY_KEY.MANAGEMENT.PRODUCT.GET,
    ProductService.getProducts,
    {
      suspense: true,
      useErrorBoundary: true
    }
  );
