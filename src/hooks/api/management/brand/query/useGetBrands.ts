import { useQuery } from 'react-query';
import { ProductService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useQuery(
    QUERY_KEY.MANAGEMENT.PRODUCT.GET_BRANDS,
    () => ProductService.getBrands(),
    {
      suspense: true,
      useErrorBoundary: true
    }
  );
