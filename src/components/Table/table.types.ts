import React from 'react';
import { Column } from 'react-table';
import { FilterProps } from '../filter';

export type GrmtTableColumnInfo<D extends object = any> = Column<D>;

export type BaseTableProps<D extends object = any> = {
  columnInfo: ReadonlyArray<GrmtTableColumnInfo<D>>;
  data?: readonly D[];
  noDataText?: string;
  pageSize?: number;
  enableSort?: boolean;
  enableSelect?: boolean;
  enableFilter?: boolean;
  // enableGlobalFilter?: boolean;
  TitleElement?: string | React.ReactElement;
  titleColor?: string;
  ExtraElement?: React.ReactElement;
  LastUpdate?: Date | string;
};

export type SimpleTableProps<D extends object = any> = BaseTableProps<D> & {
  maxHeight?: string | number;
};

export type DataTableProps<D extends object = any> = BaseTableProps<D> & {
  onPageChange: (
    skip: number,
    limit: number,
    filter?: string,
    sort?: string
  ) => void;
  FilterElement?: React.FC<FilterProps>;
  CSVUrl?: string;
  totalCount?: number;
};
