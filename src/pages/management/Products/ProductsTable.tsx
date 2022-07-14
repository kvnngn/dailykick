import { FC, useMemo, useState } from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  useTheme,
  Button,
} from '@mui/material'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { fr } from 'date-fns/locale'
import { DataPaginationTable, DKTableColumnInfo } from 'src/components/Table'
import {
  useDeleteProduct,
  useGetProducts,
} from 'src/hooks/api/management/product'
import AddProductModal, { productColors } from './add/AddProductModal'
import { ConfirmDialog, InfoDialog } from 'src/components/modal'
import EditProductModal from './edit/EditProductModal'

const ProductsTable: FC = () => {
  const theme = useTheme()
  const { data, onPageChange } = useGetProducts()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openViewImageModal, setOpenViewImageModal] = useState<boolean>(false)
  const [row, setRow] = useState<Product>(null)
  const [productId, setProductId] = useState<string>(null)
  const { mutateAsync: deleteProduct } = useDeleteProduct()

  const handleOpen = () => {
    if (!openModal) {
      setOpenModal(true)
    }
  }

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setProductId(id)
      setOpenEditModal(true)
    }
  }

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setProductId(id)
      setOpenDeleteModal(true)
    }
  }

  const handleOpenViewImageModal = (row) => {
    setRow(row)
    setOpenViewImageModal(true)
  }

  const handleDeleteProduct = async () => {
    await deleteProduct({ id: productId })
  }

  const columnInfo = useMemo<Array<DKTableColumnInfo>>(
    () => [
      {
        Header: 'ID',
        accessor: '_id' as const,
        minWidth: 130,
        maxWidth: 130,
        disableSortBy: true,
      },
      {
        Header: 'Added on',
        accessor: 'createdAt' as const,
        minWidth: 140,
        maxWidth: 140,
        disableSortBy: false,
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy HH:mm')
        },
      },
      // {
      //   Header: 'Product name',
      //   accessor: 'name' as const,
      //   disableSortBy: true,
      // },
      {
        Header: 'Brand',
        accessor: 'brand' as const,
        disableSortBy: true,
        Cell: ({ value }) => value.name,
      },
      {
        Header: 'Model',
        accessor: 'brandModel' as const,
        disableSortBy: true,
        Cell: ({ value }) => value.name,
      },
      {
        Header: 'SKU',
        accessor: 'sku' as const,
        disableSortBy: true,
      },
      {
        Header: 'Image',
        accessor: 'image_url' as const,
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <Button
              type="button"
              variant="outlined"
              onClick={() => handleOpenViewImageModal(row.values)}
            >
              Open
            </Button>
          </>
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            <Tooltip title="Modify product" arrow>
              <IconButton
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter,
                  },
                  color: theme.palette.primary.main,
                }}
                color="inherit"
                size="small"
                onClick={() => handleOpenEditModal(row.values._id)}
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete product" arrow>
              <IconButton
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main,
                }}
                color="inherit"
                size="small"
                onClick={() => handleOpenDeleteModal(row.values._id)}
              >
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    [],
  )

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
        noDataText="No existing article."
        ExtraElement={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen()}
          >
            Add product
          </Button>
        }
      />
      {openModal && <AddProductModal open={openModal} onClose={setOpenModal} />}
      {productId && openEditModal && (
        <EditProductModal
          open={openEditModal}
          onClose={setOpenEditModal}
          productId={productId}
        />
      )}
      {productId && openDeleteModal && (
        <ConfirmDialog
          title="Product deletion"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteProduct}
        >
          Are you sure you want to delete this product?
        </ConfirmDialog>
      )}
      {row && openViewImageModal && (
        <InfoDialog
          title={row.name}
          open={openViewImageModal}
          setOpen={setOpenViewImageModal}
        >
          <img
            src={row.image_url}
            style={{ width: '100%' }}
          />
        </InfoDialog>
      )}
    </Card>
  )
}

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired,
}

ProductsTable.defaultProps = {
  products: [],
}

export default ProductsTable
