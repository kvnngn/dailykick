import { StoreService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'
import { usePaginatedQuery } from 'src/hooks/api/base'

export default () =>
  usePaginatedQuery(QUERY_KEY.MANAGEMENT.STORE.GET, StoreService.getStores, {
    suspense: true,
    useErrorBoundary: true,
  })
