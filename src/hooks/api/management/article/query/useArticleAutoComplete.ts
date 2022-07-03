import { useQuery } from 'react-query'
import { ArticleService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'

export default () =>
  useQuery(
    QUERY_KEY.MANAGEMENT.ARTICLE.GET_AC,
    ArticleService.getArticleAutoComplete,
    { suspense: true, useErrorBoundary: true },
  )
