import { useQuery } from 'react-query';
import { QueryFunction } from 'react-query/types/core/types';
import { UseQueryOptions, UseQueryResult } from 'react-query/types/react/types';

export default function useSimpleQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  queryKey: string,
  queryFn: QueryFunction<TQueryFnData, string>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, string>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> {
  return useQuery(queryKey, queryFn, options);
}
