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
import { useDeleteStore, useGetStores } from 'src/hooks/api/management/store'
import { useNavigate } from 'react-router'
import { ConfirmDialog } from '../../../../components/modal'
import { ROUTES } from '../../../../routes'
import AddStoreModal from '../add/AddStoreModal'
import EditStoreModal from '../edit/EditStoreModal'

const StoresTable: FC = () => {
  const theme = useTheme()
  const { data, onPageChange } = useGetStores()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [storeId, setStoreId] = useState<string>(null)
  const { mutateAsync: deleteStore } = useDeleteStore()
  const navigate = useNavigate()

  const handleOpen = () => {
    if (!openModal) {
      setOpenModal(true)
    }
  }

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setStoreId(id)
      setOpenEditModal(true)
    }
  }

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setStoreId(id)
      setOpenDeleteModal(true)
    }
  }

  const handleDeleteStore = async () => {
    await deleteStore({ id: storeId })
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
        Header: 'Ajouté le',
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
        Header: 'Nom du magasin',
        accessor: 'name' as const,
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <Link
              onClick={(e) => {
                e.preventDefault()
                navigate(`${ROUTES.MANAGEMENT.STORES}/${row.values._id}`)
              }}
            >
              {value}
            </Link>
          )
        },
      },
      {
        Header: "Nombre d'articles",
        accessor: 'articles' as const,
        disableSortBy: true,
      },
      {
        Header: 'Actions',
        align: 'center',
        minWidth: 84,
        maxWidth: 84,
        Cell: ({ row }) => (
          <>
            <Tooltip title="Modifier magasin" arrow>
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
            <Tooltip title="Supprimer magasin" arrow>
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
        noDataText="Aucun magasin existant."
        ExtraElement={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen()}
          >
            Ajouter un magasin
          </Button>
        }
      />
      {openModal && <AddStoreModal open={openModal} onClose={setOpenModal} />}
      {storeId && openEditModal && (
        <EditStoreModal
          open={openEditModal}
          onClose={setOpenEditModal}
          storeId={storeId}
        />
      )}
      {storeId && openDeleteModal && (
        <ConfirmDialog
          title="Suppression de magasin"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteStore}
        >
          Etes-vous sur de vouloir supprimer ce magasin?
        </ConfirmDialog>
      )}
    </Card>
  )
}

export default StoresTable
