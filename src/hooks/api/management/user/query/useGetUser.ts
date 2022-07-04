import { useQuery } from 'react-query'
import { UserService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default (id: string) =>
  useQuery(QUERY_KEY.MANAGEMENT.USER.GET, () => UserService.getById(id), {
    suspense: true,
    useErrorBoundary: true,
  })
