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
import {
  useDeleteProduct,
  useGetProducts
} from 'src/hooks/api/management/product';
import AddProductModal from './add/AddProductModal';
import { ConfirmDialog } from 'src/components/modal';
import EditProductModal from './edit/EditProductModal';

const ProductsTable: FC = () => {
  const theme = useTheme();
  const { data, onPageChange } = useGetProducts();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>(null);
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const handleOpen = () => {
    if (!openModal) {
      setOpenModal(true);
    }
  };

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setProductId(id);
      setOpenEditModal(true);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setProductId(id);
      setOpenDeleteModal(true);
    }
  };

  const handleDeleteProduct = async () => {
    await deleteProduct({ id: productId });
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
        Header: 'Nom du produit',
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
            <Tooltip title="Modifier produit" arrow>
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
            <Tooltip title="Supprimer produit" arrow>
              <IconButton
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main
                }}
                color="inherit"
                size="small"
                onClick={() => handleOpenDeleteModal(row.values._id)}
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
        noDataText="Aucun produit existant."
        ExtraElement={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen()}
          >
            Ajouter un produit
          </Button>
        }
      />
      {openModal && (
        <AddProductModal open={openModal} onClose={setOpenModal} />
      )}
      {productId && openEditModal && (
        <EditProductModal
          open={openEditModal}
          onClose={setOpenEditModal}
          productId={productId}
        />
      )}
      {productId && openDeleteModal && (
        <ConfirmDialog
          title="Suppression de produit"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteProduct}
        >
          Etes-vous sur de vouloir supprimer ce produit?
        </ConfirmDialog>
      )}
    </Card>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired
};

ProductsTable.defaultProps = {
  products: []
};

export default ProductsTable;
