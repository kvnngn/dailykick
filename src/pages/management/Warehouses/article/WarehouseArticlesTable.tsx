import { FC, useMemo, useState } from 'react'
import { format } from 'date-fns'
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  useTheme,
  Button,
  Link,
} from '@mui/material'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { fr } from 'date-fns/locale'
import { DataPaginationTable, DKTableColumnInfo } from 'src/components/Table'
import * as warehouse from 'src/hooks/api/management/warehouse'
import { useNavigate } from 'react-router'
import { ConfirmDialog } from '../../../../components/modal'
import { ROUTES } from '../../../../routes'
import EditWarehouseModal from '../edit/EditWarehouseModal'
import { useGetWarehouseArticles } from '../../../../hooks/api/management/article'
import AddWarehouseArticleModal from '../add/AddWarehouseArticleModal'

type WarehouseArticlesTableProps = {
  id: string
}

const WarehouseArticlesTable: FC<WarehouseArticlesTableProps> = ({ id }) => {
  const theme = useTheme()
  const { data, onPageChange } = useGetWarehouseArticles(id)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [warehouseId, setWarehouseId] = useState<string>(null)
  const { mutateAsync: deleteWarehouse } = warehouse.useDeleteWarehouse()
  const navigate = useNavigate()

  const handleOpen = () => {
    if (!openModal) {
      setOpenModal(true)
    }
  }

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setWarehouseId(id)
      setOpenEditModal(true)
    }
  }

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setWarehouseId(id)
      setOpenDeleteModal(true)
    }
  }

  const handleDeleteWarehouse = async () => {
    await deleteWarehouse({ id: warehouseId })
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
        Header: 'Date de création',
        accessor: 'createdAt' as const,
        minWidth: 140,
        maxWidth: 140,
        disableSortBy: false,
        Cell: ({ value }) => {
          return format(new Date(value), 'dd MMMM yyyy', {
            locale: fr,
          })
        },
      },
      {
        Header: 'Nom du article',
        accessor: 'name' as const,
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <Link
              onClick={(e) => {
                e.preventDefault()
                navigate(`${ROUTES.MANAGEMENT.WAREHOUSES}/${row.values._id}`)
              }}
            >
              {value}
            </Link>
          )
        },
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
            <Tooltip title="Modifier article" arrow>
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
            <Tooltip title="Supprimer l'article" arrow>
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
        noDataText="Aucun article existant."
        ExtraElement={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen()}
          >
            Ajouter un article
          </Button>
        }
      />
      {openModal && (
        <AddWarehouseArticleModal open={openModal} onClose={setOpenModal} />
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
          title="Suppression d'article"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteWarehouse}
        >
          Etes-vous sur de vouloir supprimer ce article?
        </ConfirmDialog>
      )}
    </Card>
  )
}

export default WarehouseArticlesTable
