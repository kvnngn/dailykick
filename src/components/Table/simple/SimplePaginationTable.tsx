import React, { useMemo, useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  PluginHook,
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import {
  Box,
  Checkbox,
  InputAdornment,
  outlinedInputClasses,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { TableSortIcon } from '../table.styled';
import { BaseTableProps } from '../table.types';
import { PAGE_LIMIT } from '../table.constants';
import { NoAvailableData } from 'src/components/styled/noData';

const SimplePaginationTable: React.FC<BaseTableProps> = ({
  columnInfo,
  data = [],
  pageSize = PAGE_LIMIT,
  titleColor,
  noDataText,
  enableSort,
  enableSelect,
  enableFilter,
  TitleElement,
  ExtraElement
}) => {
  const tablePlugins = useMemo<Array<PluginHook<any>>>(() => {
    const plugins: Array<PluginHook<any>> = [];
    if (enableFilter) {
      plugins.push(useGlobalFilter);
    }
    if (enableSort) {
      plugins.push(useSortBy);
    }
    plugins.push(usePagination);
    if (enableSelect) {
      plugins.push(useRowSelect);
    }
    return plugins;
  }, [enableSort, enableSelect, enableFilter]);
  const {
    getTableProps,
    getTableBodyProps,
    getToggleAllPageRowsSelectedProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex, globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns: columnInfo,
      data,
      initialState: { pageIndex: 0, pageSize },
      pageCount: Math.ceil(data.length / pageSize),
      autoResetPage: true,
      defaultCanSort: false
    },
    ...tablePlugins
  );
  const [filterValue, setFilterValue] = useState(globalFilter);
  const onFilterChange = useAsyncDebounce((v) => {
    setGlobalFilter(v || undefined);
  }, 200);

  return (
    <>
      {(TitleElement || enableFilter || ExtraElement) && (
        <Box display="flex" alignItems="center" minHeight="3rem" pl={2} mb={2}>
          {Boolean(TitleElement) && (
            <>
              {typeof TitleElement === 'string' ? (
                <Typography color={titleColor}>{TitleElement}</Typography>
              ) : (
                TitleElement
              )}
            </>
          )}
          {(enableFilter || ExtraElement) && (
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              {Boolean(enableFilter) && (
                <TextField
                  size="small"
                  value={filterValue}
                  placeholder="Rechercher"
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    onFilterChange(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon shapeRendering="geometricPrecision" />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    mr: 2,
                    [`> .${outlinedInputClasses.root} > .${outlinedInputClasses.input}`]:
                      {
                        paddingTop: '0.622rem',
                        paddingBottom: '0.622rem'
                      }
                  }}
                />
              )}
              {Boolean(ExtraElement) && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  {ExtraElement}
                </Stack>
              )}
            </Box>
          )}
        </Box>
      )}
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
              {headerGroup.headers.map((column) => (
                <TableCell
                  key={`TableCell${idx}`}
                  {...column.getHeaderProps(
                    enableSort ? column.getSortByToggleProps() : undefined
                  )}
                  width={column.width}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth
                  }}
                >
                  {column.render('Header')}
                  {enableSort && column.canSort && (
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
                    key={`TableRow${idx}`}
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
                      maxWidth: cell.column.maxWidth
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
      <Box mt={6}>
        <Pagination
          page={pageIndex + 1}
          count={pageCount}
          onChange={(e, newPage) => gotoPage(newPage - 1)}
        />
      </Box>
    </>
  );
};
SimplePaginationTable.propTypes = {
  columnInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  pageSize: PropTypes.number,
  titleColor: PropTypes.string,
  noDataText: PropTypes.string,
  enableSort: PropTypes.bool,
  enableSelect: PropTypes.bool,
  enableFilter: PropTypes.bool,
  TitleElement: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ExtraElement: PropTypes.element
};
SimplePaginationTable.defaultProps = {
  data: [],
  pageSize: PAGE_LIMIT,
  titleColor: undefined,
  noDataText: undefined,
  enableSort: false,
  enableSelect: false,
  enableFilter: false,
  TitleElement: undefined,
  ExtraElement: undefined
};

export default React.memo(SimplePaginationTable);
