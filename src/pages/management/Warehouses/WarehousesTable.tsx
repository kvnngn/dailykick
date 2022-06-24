import { FC, useMemo, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  useTheme,
  Button
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { fr } from 'date-fns/locale';
import { DataPaginationTable, DKTableColumnInfo } from 'src/components/Table';
import { useGetWarehouses } from 'src/hooks/api/management/warehouse';
import AddWarehouseModal from './add/AddWarehouseModal';
import EditWarehouseModal from './edit/EditWarehouseModal';
import { ConfirmDialog } from 'src/components/modal';

const WarehousesTable: FC = () => {
  const theme = useTheme();
  const { data, onPageChange } = useGetWarehouses();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [warehouseId, setWarehouseId] = useState<string>(null);

  const handleOpen = () => {
    if (!openModal) {
      setOpenModal(true);
    }
  };

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setWarehouseId(id);
      setOpenEditModal(true);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setWarehouseId(id);
      setOpenDeleteModal(true);
    }
  };

  const columnInfo = useMemo<Array<DKTableColumnInfo>>(
    () => [
      {
        Header: 'ID',
        accessor: '_id' as const,
        minWidth: 130,
        maxWidth: 130,
        disableSortBy: true
      },
      {
        Header: 'Date de création',
        accessor: 'createdAt' as const,
        minWidth: 140,
        maxWidth: 140,
        disableSortBy: false,
        Cell: ({ value }) => {
          return format(new Date(value), 'dd MMMM yyyy', {
            locale: fr
          });
        }
      },
      {
        Header: 'Nom du dépot',
        accessor: 'name' as const,
        disableSortBy: true
      },
      // {
      //   Header: "Nombre d'articles",
      //   accessor: 'updatedAt' as const,
      //   disableSortBy: false,
      //   align: 'right'
      // },
      {
        Header: 'Actions',
        align: 'center',
        minWidth: 84,
        maxWidth: 84,
        Cell: ({ row }) => (
          <>
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
                onClick={() => handleOpenEditModal(row.values._id)}
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
          </>
        )
      }
    ],
    []
  );

  return (
    <Card>
      <Divider />
      <DataPaginationTable
        data={data.body.data}
        columnInfo={columnInfo}
        onPageChange={onPageChange}
        totalCount={data.body.meta.itemCount}
        enableSort
        enableSelect
        noDataText="Aucun dépot existant."
        ExtraElement={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen()}
          >
            Ajouter un dépot
          </Button>
        }
      />
      {openModal && (
        <AddWarehouseModal open={openModal} onClose={setOpenModal} />
      )}
      {warehouseId && openEditModal && (
        <EditWarehouseModal
          open={openEditModal}
          onClose={setOpenEditModal}
          warehouseId={warehouseId}
        />
      )}
      {warehouseId && openDeleteModal && (
        <ConfirmDialog
          title="Suppression de dépot"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleOpenDeleteModal}
        >
          Etes-vous sur de vouloir supprimer ce dépot?
        </ConfirmDialog>
      )}
    </Card>
  );
};

WarehousesTable.propTypes = {
  warehouses: PropTypes.array.isRequired
};

WarehousesTable.defaultProps = {
  warehouses: []
};

export default WarehousesTable;
