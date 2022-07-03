import { StoreService } from 'src/api/services'
import { useMutation, useQueryClient } from 'react-query'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.STORE.DELETE,
    mutationFn: (variables: { id: string }) =>
      StoreService.deleteStore(variables.id),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.STORE.GET),
  })
}
