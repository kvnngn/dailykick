import { UserService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'
import { usePaginatedQueryWithId } from 'src/hooks/api/base'

export default (id: string) =>
  usePaginatedQueryWithId(
    QUERY_KEY.MANAGEMENT.USER.GET,
    UserService.getUsers,
    id,
    { suspense: true, useErrorBoundary: true },
  )
