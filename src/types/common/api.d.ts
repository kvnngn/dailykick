declare type PaginatedAxios<T = unknown> = (
  skip: number,
  limit: number,
  filter?: string,
  sort?: string,
  apm?: APMSource,
  period?: RecommendPeriod,
  category?: EC2RecommendOption
) => Promise<T>;

declare type PaginatedAxiosWithDate<T = unknown> = (
  skip: number,
  limit: number,
  startDate: string,
  endDate: string,
  filter?: string,
  sort?: string
) => Promise<T>;

declare type PaginatedAxiosWithId<T = unknown> = (
  skip: number,
  limit: number,
  filter?: string,
  sort?: string,
  id?: string
) => Promise<T>;

declare type ContentRange = {
  startRow: number;
  endRow: number;
  totalCount: number;
};

declare enum CCQueryStatus {
  NULL = '',
  OK = 'OK',
  ERROR = 'Error'
}

declare type CCQueryParams = {
  filter?: any;
  sortOrder?: '1' | '-1';
  sortField?: string;
  pageNumber?: number;
  pageSize?: number;
};

declare type CCQueryResponse<T = unknown, R = unknown> = {
  data: Array<T>;
  meta?: R;
};

declare type CCQuerySingleResponse<T = unknown, R = unknown> = {
  msg: string;
  items: T;
  totalCount: number;
  status?: CCQueryStatus;
  extras?: R;
};

declare type CCQueryError = {
  message: string;
};

declare type WithContentRange<T = unknown> = {
  headers?: ContentRange;
  body?: T;
};
