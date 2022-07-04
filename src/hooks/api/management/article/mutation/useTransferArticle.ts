import { useMutation, useQueryClient } from 'react-query'
import { ArticleService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.ARTICLE.PUT,
    mutationFn: (variables: {
      articleId: string
      transferPrice: number
      store: string
      updatedBy: string
    }) =>
      ArticleService.transferArticle(
        variables.articleId,
        variables.transferPrice,
        variables.store,
        variables.updatedBy,
      ),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.ARTICLE.GET),
  })
}
