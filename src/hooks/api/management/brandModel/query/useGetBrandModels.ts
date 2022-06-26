import { useQuery } from 'react-query';
import { ProductService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useQuery(
    QUERY_KEY.MANAGEMENT.PRODUCT.GET_BRANDMODELS,
    () => ProductService.getBrandModels(),
    {
      suspense: true,
      useErrorBoundary: true
    }
  );
