import { QUERY_KEY } from 'src/constants'
import { usePaginatedQueryWithQuery } from 'src/hooks/api/base'
import { ProductService } from '../../../../../api/services'

export default () => {
  return usePaginatedQueryWithQuery(
    QUERY_KEY.MANAGEMENT.PRODUCT.GET,
    ProductService.getProducts,
    { suspense: true, useErrorBoundary: true },
  )
}
