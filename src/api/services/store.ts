import { API_URL } from 'src/constants'
import { parseContentRange } from 'src/utils'
import axios from 'src/utils/axios'
import { treeShakeObject } from 'src/utils/common'

const getStore = async (id: string): Promise<Store> => {
  const { data } = await axios.get(`${API_URL.STORE}/id/${id}`)
  return data
}

const getStoreArticles: PaginatedAxios<
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
> = async (skip, limit, filter, sort, storeId) => {
  const { headers, data } = await axios.get(`${API_URL.ARTICLE}/${storeId}`, {
    params: {
      skip,
      limit,
      filter,
      sort,
    },
  })
  return { headers: parseContentRange(headers), body: data }
}

const getStores: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      Store,
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
> = async (skip, limit, filter, sort) => {
  const { headers, data } = await axios.get(`${API_URL.STORE}`, {
    params: {
      skip,
      limit,
      filter,
      sort,
    },
  })
  return { headers: parseContentRange(headers), body: data }
}

const createStore = async (name: string, createdBy: string) => {
  const { data } = await axios.post(`${API_URL.STORE}/add`, {
    name,
    createdBy,
  })
  return data
}

const updateStore = async (
  original: Store,
  changes: Partial<Store>,
): Promise<Store> => {
  const { data } = await axios.put(`${API_URL.STORE}/id/${original._id}`, {
    ...treeShakeObject(original),
    ...changes,
  })
  return data
}

const deleteStore = async (id: string): Promise<any> => {
  const { data } = await axios.delete(`${API_URL.STORE}/id/${id}`)
  return data
}

const deleteStores = (ids: string[]) =>
  axios.delete('/users', {
    data: {
      ItemList: ids,
    },
  })

export default {
  getStore,
  getStores,
  createStore,
  updateStore,
  deleteStore,
  deleteStores,
  getStoreArticles,
}
