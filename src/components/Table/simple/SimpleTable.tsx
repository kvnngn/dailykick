import React, { useMemo, useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  PluginHook,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow} from '@mui/material';

import { TableSortIcon } from '../table.styled';
import { SimpleTableProps } from '../table.types';
import { NoAvailableData } from 'src/components/styled/noData';

const SimpleTable: React.FC<SimpleTableProps> = ({
  columnInfo,
  data,
  maxHeight,
  noDataText,
  enableSort,
  enableSelect,
  enableFilter}) => {
  const tablePlugins = useMemo<Array<PluginHook<any>>>(() => {
    const plugins: Array<PluginHook<any>> = [];
    if (enableFilter) {
      plugins.push(useGlobalFilter);
    }
    if (enableSort) {
      plugins.push(useSortBy);
    }
    if (enableSelect) {
      plugins.push(useRowSelect);
    }
    return plugins;
  }, [enableSort, enableSelect, enableFilter]);

  const {
    getTableProps,
    getTableBodyProps,
    getToggleAllRowsSelectedProps,
    headerGroups,
    prepareRow,
    rows,
    state: { globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns: columnInfo,
      data,
      defaultCanSort: false
    },
    ...tablePlugins
  );

  const [filterValue, setFilterValue] = useState(globalFilter);

  return (
    <>
      <Box
        sx={{
          maxHeight: maxHeight || undefined,
          overflowY: maxHeight ? 'auto' : 'visible'
        }}
      >
        <Table stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, idx) => (
              <TableRow
                key={`TableRow${idx}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {enableSelect && idx === headerGroups.length - 1 && (
                  <TableCell
                    padding="checkbox"
                    sx={{ bgcolor: '#fff', borderBottom: '2px solid #F0F0F7' }}
                  >
                    <Checkbox {...getToggleAllRowsSelectedProps()} />
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
                      maxWidth: column.maxWidth,
                      bgcolor: '#fff',
                      borderBottom: '2px solid #F0F0F7'
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
            {rows.map((row, idx) => {
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
      </Box>
    </>
  );
};

SimpleTable.propTypes = {
  columnInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleColor: PropTypes.string,
  noDataText: PropTypes.string,
  enableSort: PropTypes.bool,
  enableSelect: PropTypes.bool,
  enableFilter: PropTypes.bool,
  TitleElement: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ExtraElement: PropTypes.element,
  LastUpdate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ])
};
SimpleTable.defaultProps = {
  data: [],
  maxHeight: undefined,
  titleColor: undefined,
  noDataText: undefined,
  enableSort: false,
  enableSelect: false,
  enableFilter: false,
  TitleElement: undefined,
  ExtraElement: undefined,
  LastUpdate: undefined
};

export default React.memo(SimpleTable);
