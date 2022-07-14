import { FC, useMemo, useState } from 'react'
import { format } from 'date-fns'
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
import { useNavigate } from 'react-router'
import { ConfirmDialog } from '../../../../components/modal'
import useGetUsers from '../../../../hooks/api/management/user/query/useGetUsers'
import { useDeleteUser } from '../../../../hooks/api/management/user'
import EditSellerModal from '../edit/EditSellerModal'
import AddSellerModal from '../add/AddSellerModal'

type SellersTableProps = {
  id: string
}

const SellersTable: FC<SellersTableProps> = ({ id }) => {
  const theme = useTheme()
  const { data, onPageChange } = useGetUsers(id)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [sellerId, setUserId] = useState<string>(null)
  const { mutateAsync: deleteUser } = useDeleteUser()
  const navigate = useNavigate()

  const handleOpen = (id: string) => {
    if (!openModal) {
      setUserId(id)
      setOpenModal(true)
    }
  }

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setUserId(id)
      setOpenEditModal(true)
    }
  }

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setUserId(id)
      setOpenDeleteModal(true)
    }
  }

  const handleDeleteWarehouse = async () => {
    await deleteUser({ id: sellerId })
  }

  const columnInfo = useMemo<Array<DKTableColumnInfo>>(
    () => [
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
      {
        Header: 'Email address',
        accessor: 'email' as const,
        disableSortBy: true,
      },
      {
        Header: 'Lastname',
        accessor: 'lastname' as const,
        disableSortBy: true,
      },
      {
        Header: 'Firstname',
        accessor: 'firstname' as const,
        disableSortBy: true,
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            <Tooltip title="Modify seller" arrow>
              <IconButton
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter,
                  },
                  color: theme.palette.primary.main,
                }}
                color="inherit"
                size="small"
                onClick={() => handleOpenEditModal(row.original._id)}
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete seller" arrow>
              <IconButton
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main,
                }}
                color="inherit"
                size="small"
                onClick={() => handleOpenDeleteModal(row.original._id)}
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
        noDataText="No existing seller."
        ExtraElement={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen(id)}
          >
            Add seller
          </Button>
        }
      />
      {openModal && (
        <AddSellerModal open={openModal} onClose={setOpenModal} storeId={id} />
      )}
      {sellerId && openEditModal && (
        <EditSellerModal
          open={openEditModal}
          onClose={setOpenEditModal}
          sellerId={sellerId}
        />
      )}
      {sellerId && openDeleteModal && (
        <ConfirmDialog
          title="Seller Deletion"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteWarehouse}
        >
          Are you sure you want to delete this seller?
        </ConfirmDialog>
      )}
    </Card>
  )
}

export default SellersTable
