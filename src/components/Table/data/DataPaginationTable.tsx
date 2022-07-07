import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  PluginHook,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'
import {
  Backdrop,
  Box,
  Checkbox,
  IconButton,
  Pagination,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { FormikValues } from 'formik'
import * as PropTypes from 'prop-types'
import { DataTableProps } from '../table.types'
import { TableSortIcon } from '../table.styled'
import { PAGE_LIMIT } from '../table.constants'
import { NoAvailableData } from 'src/components/styled/noData'
import { useCurrentInfo } from 'src/hooks/api/common'
import { useSnackbar } from 'src/hooks/common'
import { parseFilterValues } from 'src/utils/parser'
import BulkActions from '../BulkActions'
import { SuspensePaper } from '../../styled/suspense'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

const DataPaginationTable: React.FC<DataTableProps> = ({
  columnInfo,
  data,
  onPageChange,
  pageSize,
  totalCount,
  noDataText,
  enableSort,
  enableSelect,
  ExtraElement,
  FilterElement,
}) => {
  const { showErrorSnackbar } = useSnackbar()
  const totalPage = useMemo<number>(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize],
  )
  const tablePlugins = useMemo<Array<PluginHook<any>>>(() => {
    const plugins: Array<PluginHook<any>> = []
    if (enableSort) {
      plugins.push(useSortBy)
    }
    plugins.push(usePagination)
    if (enableSelect) {
      plugins.push(useRowSelect)
    }
    return plugins
  }, [enableSort, enableSelect])

  const {
    getTableProps,
    getTableBodyProps,
    getToggleAllPageRowsSelectedProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    state,
  } = useTable(
    {
      columns: columnInfo,
      data,
      initialState: { pageIndex: 0, pageSize },
      pageCount: totalPage,
      autoResetPage: true,
      defaultCanSort: false,
      manualPagination: true,
      manualSortBy: true,
    },
    ...tablePlugins,
  )
  const [rawFilterValue, setRawFilterValue] = useState<
    FormikValues | undefined
  >(undefined)
  const [filterValue, setFilterValue] = useState<string | undefined>(
    parseFilterValues({}),
  )

  const filterContainerRef = useRef()

  useEffect(() => {
    const sort =
      state.sortBy && state.sortBy.length
        ? JSON.stringify({
            [state.sortBy[0].id]: state.sortBy[0].desc ? -1 : 1,
          })
        : undefined
    onPageChange(
      state.pageIndex * state.pageSize,
      state.pageSize,
      filterValue,
      sort,
    )
  }, [state.pageIndex, state.pageSize, state.sortBy, filterValue, onPageChange])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openFilter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])
  const closeFilter = useCallback(() => {
    setAnchorEl(null)
  }, [])
  const toggleFilter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (anchorEl) {
        closeFilter()
      } else {
        openFilter(e)
      }
    },
    [anchorEl],
  )

  const onFilterChange = useCallback(
    (filter: FormikValues) => {
      setFilterValue(parseFilterValues(filter))
      setRawFilterValue(filter)
    },
    [setFilterValue, setRawFilterValue],
  )
  return (
    <>
      {/* <Box flex={1} p={2}>
        <BulkActions />
      </Box> */}
      {Boolean(ExtraElement) && (
        <>
          <Box
            display="flex"
            alignItems="center"
            minHeight="3rem"
            flex={1}
            p={2}
          >
            {Boolean(ExtraElement) && (
              <Box
                display="flex"
                flexGrow={1}
                justifyContent="flex-end"
                alignItems="center"
                ref={filterContainerRef}
              >
                {Boolean(ExtraElement) && (
                  <Box display="flex" alignItems="center">
                    {ExtraElement}
                  </Box>
                )}
                {Boolean(FilterElement) && (
                  <>
                    <Backdrop
                      open={Boolean(anchorEl)}
                      onClick={closeFilter}
                      sx={{ bgcolor: 'transparent' }}
                    />
                    <IconButton
                      onClick={toggleFilter}
                      disabled={!data?.length && !rawFilterValue}
                      sx={{
                        width: '2.5rem',
                        height: '2.5rem',
                        border: '1px solid black',
                        marginLeft: '10px',
                      }}
                    >
                      <FilterAltIcon />
                    </IconButton>
                    <Popper
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      placement="bottom-end"
                      container={filterContainerRef.current}
                      disablePortal
                      style={{ zIndex: 10000 }}
                    >
                      <SuspensePaper
                        variant="elevation"
                        square={false}
                        sx={{
                          width: 400,
                          maxWidth: 400,
                          p: 3,
                        }}
                      >
                        <FilterElement
                          onClose={closeFilter}
                          onFilterChange={onFilterChange}
                          previousValues={rawFilterValue}
                        />
                      </SuspensePaper>
                    </Popper>
                  </>
                )}
              </Box>
            )}
          </Box>
        </>
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
                        : undefined,
                    )}
                    width={column.width}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
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
              prepareRow(row)
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
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              )
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
  )
}
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
  ExtraElement: PropTypes.element,
  FilterElement: PropTypes.func,
}
DataPaginationTable.defaultProps = {
  data: [],
  pageSize: PAGE_LIMIT,
  totalCount: 0,
  titleColor: undefined,
  noDataText: undefined,
  enableSort: false,
  enableSelect: false,
  ExtraElement: undefined,
  FilterElement: undefined,
}

export default React.memo(DataPaginationTable)
