import { useMutation, useQueryClient } from 'react-query'
import { UserService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.USER.PUT,
    mutationFn: (variables: {
      original: User
      changes: Partial<Omit<User, 'avatar' | 'roles' | 'store' | '_id'>>
    }) => UserService.updateUser(variables.original, variables.changes),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.USER.GET),
  })
}
