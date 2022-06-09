import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme
} from '@mui/material';

import { Warehouse, WarehouseStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { fr } from 'date-fns/locale';

interface RecentOrdersTableProps {
  className?: string;
  warehouses: Warehouse[];
}

interface Filters {
  status?: WarehouseStatus;
}

const applyFilters = (
  warehouses: Warehouse[],
  filters: Filters
): Warehouse[] => {
  return warehouses.filter((item) => {
    let matches = true;

    if (filters.status && item.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  warehouses: Warehouse[],
  page: number,
  limit: number
): Warehouse[] => {
  return warehouses.slice(page * limit, page * limit + limit);
};

const DKTable: FC<RecentOrdersTableProps> = ({ warehouses }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedItems.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllItems = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedItems(
      event.target.checked
        ? warehouses.map((item) => item.id)
        : []
    );
  };

  const handleSelectOneItem = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string
  ): void => {
    if (!selectedItems.includes(itemId)) {
      setSelectedItems((prevSelected) => [
        ...prevSelected,
        itemId
      ]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredItems = applyFilters(warehouses, filters);
  const paginatedItems = applyPagination(
    filteredItems,
    page,
    limit
  );
  const selectedSomeItems =
    selectedItems.length > 0 &&
    selectedItems.length < warehouses.length;
  const selectedAllItems =
    selectedItems.length === warehouses.length;
  const theme = useTheme();

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllItems}
                  indeterminate={selectedSomeItems}
                  onChange={handleSelectAllItems}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell>Nom du dépot</TableCell>
              <TableCell align="right">Nombre d'articles</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((warehouse) => {
              const isItemSelected = selectedItems.includes(
                warehouse.id
              );
              return (
                <TableRow
                  hover
                  key={warehouse.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, warehouse.id)
                      }
                      value={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {warehouse.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(warehouse.orderDate, 'dd MMMM yyyy', {
                        locale: fr
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {warehouse.orderDetails}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {warehouse.amountCrypto}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Modifier dépot" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer dépot" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

DKTable.propTypes = {
  warehouses: PropTypes.array.isRequired
};

DKTable.defaultProps = {
  warehouses: []
};

export default DKTable;
