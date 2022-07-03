import { useMutation, useQueryClient } from 'react-query'
import { StoreService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.STORE.ADD,
    mutationFn: (variables: { name: string; createdBy: string }) =>
      StoreService.createStore(variables.name, variables.createdBy),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.STORE.GET),
  })
}
