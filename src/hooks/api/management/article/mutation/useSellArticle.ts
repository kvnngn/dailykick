import { useMutation, useQueryClient } from 'react-query'
import { ArticleService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.MANAGEMENT.ARTICLE.PUT,
    mutationFn: (variables: {
      articleId: string
      sellingPrice: number
      updatedBy: string
    }) =>
      ArticleService.sellArticle(
        variables.articleId,
        variables.sellingPrice,
        variables.updatedBy,
      ),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.MANAGEMENT.ARTICLE.GET),
  })
}
