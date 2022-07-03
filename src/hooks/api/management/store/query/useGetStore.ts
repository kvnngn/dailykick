import { useQuery } from 'react-query'
import { StoreService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default (id: string) =>
  useQuery(QUERY_KEY.MANAGEMENT.STORE.GET, () => StoreService.getStore(id), {
    suspense: true,
    useErrorBoundary: true,
  })
