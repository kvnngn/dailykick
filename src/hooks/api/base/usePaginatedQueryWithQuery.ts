import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { UseQueryOptions, UseQueryResult } from 'react-query/types/react/types'
import { useRecoilValue } from 'recoil'
import { productNameState } from '../../../atoms/global'
import { PAGE_LIMIT } from '../../../components/Table/table.constants'

export default function usePaginatedQueryWithName<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  key: string,
  fetchFn: PaginatedAxiosWithId<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<
      TQueryFnData,
      TError,
      TData,
      [
        string,
        number,
        number,
        string | undefined,
        string | undefined,
        string | undefined,
      ]
    >,
    'queryKey' | 'queryFn'
  >,
  pageSize: number = PAGE_LIMIT,
): UseQueryResult<TData, TError> & {
  pageSize: number
  onPageChange: (
    skip: number,
    limit: number,
    filter?: string,
    sort?: string,
  ) => void
} {
  const [skipDocs, setSkipDocs] = useState<number>(0)
  const [limitDocs, setLimitDocs] = useState<number>(pageSize)
  const [filterOption, setFilterOption] = useState<string | undefined>(
    undefined,
  )
  const [sortOption, setSortOption] = useState<string | undefined>(undefined)

  const onPageChange = useCallback(
    (skip: number, limit: number, filter?: string, sort?: string) => {
      setSkipDocs(skip)
      setLimitDocs(limit)
      setFilterOption(filter)
      setSortOption(sort)
    },
    [setSkipDocs, setLimitDocs, setFilterOption, setSortOption],
  )
  const productName = useRecoilValue(productNameState)

  const query = useQuery(
    [key, skipDocs, limitDocs, filterOption, sortOption, productName] as const,
    ({ queryKey }) => {
      return fetchFn(
        queryKey[1],
        queryKey[2],
        queryKey[3],
        queryKey[4],
        queryKey[5],
      )
    },
    {
      ...options,
    },
  )
  return {
    ...query,
    onPageChange,
    pageSize,
  }
}
