import { useMutation, useQueryClient } from 'react-query'
import { StoreService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.STORE.ADD,
    mutationFn: (variables: {
      original: Store
      changes: Partial<
        Omit<
          Store,
          '_id' | 'createdBy' | 'createdAt' | 'lastUpdated' | 'lastUpdatedBy'
        >
      >
    }) => StoreService.updateStore(variables.original, variables.changes),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.STORE.GET),
  })
}
