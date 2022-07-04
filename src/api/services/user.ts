import { API_URL, QUERY_KEY } from 'src/constants'
import axios from 'src/utils/axios'
import { treeShakeObject } from 'src/utils/common'
import { parseContentRange } from '../../utils'

const getById = async (id: string): Promise<User> => {
  const { data } = await axios.get(`${API_URL.PROFILE}/id/${id}`)
  return data
}

const getUsers: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      User,
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
  const { headers, data } = await axios.get(
    `${API_URL.PROFILE}/store/${storeId}`,
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

const createUser = async (
  email: string,
  password: string,
  lastname: string,
  firstname: string,
  store: string,
) => {
  const { data } = await axios.post(API_URL.PROFILE, {
    email,
    password,
    lastname,
    firstname,
    store,
  })
  return data
}

const updateUser = async (
  original: User,
  changes: Partial<User>,
): Promise<CCQueryResponse<User>> => {
  const { data } = await axios.put(`${API_URL.PROFILE}/id/${original._id}`, {
    ...treeShakeObject(original),
    ...changes,
  })
  return data
}

const deleteUser = async (id: string): Promise<CCQueryResponse<any>> => {
  const { data } = await axios.delete(`${API_URL.PROFILE}/id/${id}`)
  return data
}

const deleteUsers = (ids: string[]) =>
  axios.delete(`${API_URL.PROFILE}`, {
    data: {
      ItemList: ids,
    },
  })

export default {
  getById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteUsers,
}
