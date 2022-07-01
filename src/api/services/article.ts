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

const createArticle = async (
  product: string,
  createdBy: string,
  warehouse: string,
  storehousePrice: number,
  sku: string,
) => {
  const { data } = await axios.post(`${API_URL.ARTICLE}/add`, {
    product,
    createdBy,
    warehouse,
    storehousePrice,
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

export default {
  getArticle,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  deleteArticles,
}
