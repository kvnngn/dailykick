import { useMutation, useQueryClient } from 'react-query'
import { UserService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.USER.ADD,
    mutationFn: (variables: {
      email: string
      password: string
      lastname: string
      firstname: string
      store: string
    }) =>
      UserService.createUser(
        variables.email,
        variables.password,
        variables.lastname,
        variables.firstname,
        variables.store,
      ),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.USER.GET),
  })
}
