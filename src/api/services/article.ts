import { API_URL } from 'src/constants'
import { parseContentRange } from 'src/utils'
import axios from 'src/utils/axios'
import { treeShakeObject } from 'src/utils/common'

const getArticle = async (id: string): Promise<Article> => {
  const { data } = await axios.get(`${API_URL.ARTICLE}/id/${id}`)
  return data
}

const getArticles: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      Article,
      {
        offset: number
        page: number
        limit: number
        searchQuery: string
        itemCount: number
        pageCount: number
        hasPreviousPage: boolean
        hasNextPage: boolean
      }
    >
  >
> = async (skip, limit, filter, sort, warehouseId) => {
  const { headers, data } = await axios.get(
    `${API_URL.ARTICLE}/${warehouseId}`,
    {
      params: {
        skip,
        limit,
        filter,
        sort,
      },
    },
  )
  return { headers: parseContentRange(headers), body: data }
}

const getStoreInventory: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      Article,
      {
        offset: number
        page: number
        limit: number
        searchQuery: string
        itemCount: number
        pageCount: number
        hasPreviousPage: boolean
        hasNextPage: boolean
      }
    >
  >
> = async (skip, limit, filter, sort, warehouseId) => {
  const { headers, data } = await axios.get(
    `${API_URL.ARTICLE}/${warehouseId}/store/byproducts`,
    {
      params: {
        skip,
        limit,
        filter,
        sort,
      },
    },
  )
  return { headers: parseContentRange(headers), body: data }
}

const getWarehouseInventory: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      Article,
      {
        offset: number
        page: number
        limit: number
        searchQuery: string
        itemCount: number
        pageCount: number
        hasPreviousPage: boolean
        hasNextPage: boolean
      }
    >
  >
> = async (skip, limit, filter, sort, warehouseId) => {
  const { headers, data } = await axios.get(
    `${API_URL.ARTICLE}/${warehouseId}/warehouse/byproducts`,
    {
      params: {
        skip,
        limit,
        filter,
        sort,
      },
    },
  )
  return { headers: parseContentRange(headers), body: data }
}

const createArticle = async (
  product: string,
  createdBy: string,
  warehouse: string,
  store: string,
  warehousePrice: number,
  storePrice: number,
  size: number,
  sku: string,
) => {
  const { data } = await axios.post(`${API_URL.ARTICLE}/add`, {
    product,
    createdBy,
    warehouse,
    store,
    warehousePrice,
    storePrice,
    size,
    sku,
  })
  return data
}

const updateArticle = async (
  original: Article,
  changes: Partial<Article>,
): Promise<Article> => {
  const { data } = await axios.put(`${API_URL.ARTICLE}/id/${original._id}`, {
    ...treeShakeObject(original),
    ...changes,
  })
  return data
}

const transferArticle = async (
  articleId: string,
  transferPrice: number,
  store: string,
  updatedBy: string,
): Promise<Article> => {
  const { data } = await axios.put(`${API_URL.ARTICLE}/transfer/${articleId}`, {
    transferPrice,
    store,
    updatedBy,
  })
  return data
}
const sellArticle = async (
  articleId: string,
  sellingPrice: number,
  updatedBy: string,
): Promise<Article> => {
  const { data } = await axios.put(`${API_URL.ARTICLE}/sell/${articleId}`, {
    sellingPrice,
    updatedBy,
  })
  return data
}

const deleteArticle = async (id: string): Promise<any> => {
  const { data } = await axios.delete(`${API_URL.ARTICLE}/id/${id}`)
  return data
}

const deleteArticles = (ids: string[]) =>
  axios.delete('/users', {
    data: {
      ItemList: ids,
    },
  })

const getArticleAutoComplete = async (): Promise<ArticleAutoComplete> => {
  const { data } = await axios.get(`${API_URL.ARTICLE}/acdata`)
  return data
}

export default {
  getArticle,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  deleteArticles,
  getArticleAutoComplete,
  transferArticle,
  getStoreInventory,
  getWarehouseInventory,
  sellArticle,
}
