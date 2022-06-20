import React, { useEffect, useMemo, useState } from 'react';
import {
  PluginHook,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import {
  Box,
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { FormikValues } from 'formik';
import * as PropTypes from 'prop-types';
import { DataTableProps } from '../table.types';
import { TableSortIcon } from '../table.styled';
import { PAGE_LIMIT } from '../table.constants';
import { NoAvailableData } from 'src/components/styled/noData';
import { useCurrentInfo } from 'src/hooks/api/common';
import { useSnackbar } from 'src/hooks/common';
import { parseFilterValues } from 'src/utils/parser';
import BulkActions from '../BulkActions';

const DataPaginationTable: React.FC<DataTableProps> = ({
  columnInfo,
  data,
  onPageChange,
  pageSize,
  totalCount,
  noDataText,
  enableSort,
  enableSelect,
  ExtraElement
}) => {
  const { showErrorSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const totalPage = useMemo<number>(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );
  const tablePlugins = useMemo<Array<PluginHook<any>>>(() => {
    const plugins: Array<PluginHook<any>> = [];
    if (enableSort) {
      plugins.push(useSortBy);
    }
    plugins.push(usePagination);
    if (enableSelect) {
      plugins.push(useRowSelect);
    }
    return plugins;
  }, [enableSort, enableSelect]);

  const {
    getTableProps,
    getTableBodyProps,
    getToggleAllPageRowsSelectedProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    state
  } = useTable(
    {
      columns: columnInfo,
      data,
      initialState: { pageIndex: 0, pageSize },
      pageCount: totalPage,
      autoResetPage: true,
      defaultCanSort: false,
      manualPagination: true,
      manualSortBy: true
    },
    ...tablePlugins
  );
  const [rawFilterValue, setRawFilterValue] = useState<
    FormikValues | undefined
  >(undefined);
  const [filterValue, setFilterValue] = useState<string | undefined>(
    parseFilterValues({})
  );

  const { currentUser } = useCurrentInfo();

  useEffect(() => {
    const sort =
      state.sortBy && state.sortBy.length
        ? JSON.stringify({
            [state.sortBy[0].id]: state.sortBy[0].desc ? '-1' : '1'
          })
        : undefined;
    onPageChange(
      state.pageIndex * state.pageSize,
      state.pageSize,
      filterValue,
      sort
    );
  }, [
    state.pageIndex,
    state.pageSize,
    state.sortBy,
    filterValue,
    onPageChange
  ]);
  return (
    <>
      {/* <Box flex={1} p={2}>
        <BulkActions />
      </Box> */}
      {Boolean(ExtraElement) && (
        <Box display="flex" alignItems="center" minHeight="3rem" flex={1} p={2}>
          {Boolean(ExtraElement) && (
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              {Boolean(ExtraElement) && (
                <Box display="flex" alignItems="center">
                  {ExtraElement}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, idx) => (
              <TableRow
                key={`TableRow${idx}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {enableSelect && idx === headerGroups.length - 1 && (
                  <TableCell padding="checkbox">
                    <Checkbox {...getToggleAllPageRowsSelectedProps()} />
                  </TableCell>
                )}
                {headerGroup.headers.map((column, idx) => (
                  <TableCell
                    key={`TableCell${idx}`}
                    {...column.getHeaderProps(
                      enableSort && column.canSort && Boolean(data?.length)
                        ? column.getSortByToggleProps()
                        : undefined
                    )}
                    width={column.width}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {column.render('Header')}
                    {enableSort && column.canSort && Boolean(data?.length) && (
                      <TableSortIcon
                        isSorted={column.isSorted}
                        isDesc={column.isSortedDesc}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <TableRow
                  key={`TableRow${idx}`}
                  {...row.getRowProps()}
                  selected={row.isSelected}
                  hover
                >
                  {enableSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox {...row.getToggleRowSelectedProps()} />
                    </TableCell>
                  )}
                  {row.cells.map((cell, idx) => (
                    <TableCell
                      key={`TableCell${idx}`}
                      {...cell.getCellProps()}
                      width={cell.column.width}
                      align={cell.column.align}
                      title={
                        typeof cell.value === 'string' ||
                        typeof cell.value === 'number'
                          ? cell.value.toString()
                          : undefined
                      }
                      sx={{
                        color: cell.column.color,
                        backgroundColor: cell.column.backgroundColor,
                        minWidth: cell.column.minWidth,
                        maxWidth: cell.column.maxWidth,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {Boolean(!data?.length) && (
          <Box p={3}>
            <NoAvailableData text={noDataText} />
          </Box>
        )}
      </TableContainer>
      {pageCount > 0 && (
        <Box p={2}>
          <Pagination
            page={state.pageIndex + 1}
            count={pageCount}
            onChange={(e, newPage) => gotoPage(newPage - 1)}
          />
        </Box>
      )}
    </>
  );
};
DataPaginationTable.propTypes = {
  columnInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  titleColor: PropTypes.string,
  noDataText: PropTypes.string,
  enableSort: PropTypes.bool,
  enableSelect: PropTypes.bool,
  ExtraElement: PropTypes.element
};
DataPaginationTable.defaultProps = {
  data: [],
  pageSize: PAGE_LIMIT,
  totalCount: 0,
  titleColor: undefined,
  noDataText: undefined,
  enableSort: false,
  enableSelect: false,
  ExtraElement: undefined
};

export default React.memo(DataPaginationTable);
