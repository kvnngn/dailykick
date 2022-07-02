import { useQuery } from 'react-query'
import { ArticleService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default (id: string) =>
  useQuery(
    QUERY_KEY.MANAGEMENT.ARTICLE.GET,
    () => ArticleService.getArticle(id),
    {
      suspense: true,
      useErrorBoundary: true,
    },
  )
