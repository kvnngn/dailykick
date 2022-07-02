import { useMutation, useQueryClient } from 'react-query'
import { ArticleService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.ARTICLE.PUT,
    mutationFn: (variables: {
      original: Article
      changes: Partial<
        Omit<
          Article,
          | '_id'
          | 'createdBy'
          | 'createdAt'
          | 'lastUpdated'
          | 'lastUpdatedBy'
          | 'warehouse'
          | 'sold'
          | 'soldAt'
          | 'transferedAt'
          | 'transfered'
        >
      >
    }) => ArticleService.updateArticle(variables.original, variables.changes),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.ARTICLE.GET),
  })
}
