import { ArticleService } from 'src/api/services'
import { QUERY_KEY } from 'src/constants'
import { usePaginatedQueryWithId } from 'src/hooks/api/base'

export default (id: string) =>
  usePaginatedQueryWithId(
    QUERY_KEY.MANAGEMENT.ARTICLE.GET_WAREHOUSE_INVENTORY,
    ArticleService.getWarehouseInventory,
    id,
    { suspense: true, useErrorBoundary: true },
  )
