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
import EditArticleModal from '../edit/EditArticleModal'
import AddArticleModal from '../add/AddArticleModal'
import useDeleteArticle from '../../../../hooks/api/management/article/mutation/useDeleteArticle'
import {
  useGetArticles,
  useTransferToWarehouseArticle,
} from '../../../../hooks/api/management/article'
import ArticlesFilter from './ArticlesFilter'
import SellIcon from '@mui/icons-material/Sell'
import SellArticleModal from '../sell/SellArticleModal'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useCurrentInfo, useCurrentUser } from '../../../../hooks/api/common'
import TransferArticleToStoreModal from '../transfer/TransferArticleToStoreModal'

type ArticlesTableProps = {
  id: string
}

const ArticlesTable: FC<ArticlesTableProps> = ({ id }) => {
  const theme = useTheme()
  const { data, onPageChange } = useGetArticles(id)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openTransferWarehouseModal, setOpenTransferWarehouseModal] =
    useState<boolean>(false)
  const [openTransferStoreModal, setOpenTransferStoreModal] =
    useState<boolean>(false)
  const [openSellModal, setOpenSellModal] = useState<boolean>(false)
  const [articleId, setArticleId] = useState<string>(null)
  const { mutateAsync: deleteArticle } = useDeleteArticle()
  const { mutateAsync: transferToWarehouse } = useTransferToWarehouseArticle()
  const { currentUser } = useCurrentInfo()

  const handleOpen = (id: string) => {
    if (!openModal) {
      setArticleId(id)
      setOpenModal(true)
    }
  }

  const handleOpenEditModal = (id: string) => {
    if (!openEditModal) {
      setArticleId(id)
      setOpenEditModal(true)
    }
  }

  const handleOpenDeleteModal = (id: string) => {
    if (!openDeleteModal) {
      setArticleId(id)
      setOpenDeleteModal(true)
    }
  }

  const handleOpenTransferWarehouseModal = (id: string) => {
    if (!openTransferWarehouseModal) {
      setArticleId(id)
      setOpenTransferWarehouseModal(true)
    }
  }

  const handleOpenTransferStoreModal = (id: string) => {
    if (!openTransferStoreModal) {
      setArticleId(id)
      setOpenTransferStoreModal(true)
    }
  }

  const handleOpenSellModal = (id: string) => {
    if (!openSellModal) {
      setArticleId(id)
      setOpenSellModal(true)
    }
  }

  const handleDeleteWarehouse = async () => {
    await deleteArticle({ id: articleId })
  }

  const handleTransferToWarehouse = async () => {
    await transferToWarehouse({
      articleId: articleId,
      updatedBy: currentUser._id,
    })
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
      {
        Header: 'Product',
        accessor: 'product' as const,
        disableSortBy: true,
        Cell: ({ value }) => value.name,
      },
      {
        Header: 'Price',
        accessor: 'storePrice' as const,
        disableSortBy: false,
        Cell: ({ value }) => (value ? `AED ${value}` : 'Undefined'),
      },
      {
        Header: 'Size',
        accessor: 'size' as const,
        disableSortBy: true,
      },
      {
        Header: 'Sold ?',
        accessor: 'soldAt' as const,
        disableSortBy: true,
        Cell: ({ value, row }) =>
          value
            ? `${format(new Date(value), 'dd/MM/yyyy', {
                locale: fr,
              })} (AED ${row.original.sellingPrice})`
            : 'No',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            {currentUser.roles === 'ADMIN' && (
              <>
                <Tooltip title="Modify article" arrow>
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
                <Tooltip title="Delete l'article" arrow>
                  <IconButton
                    disabled={row.original.soldAt}
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

                <Tooltip title="Transfer article to store" arrow>
                  <IconButton
                    disabled={row.original.soldAt}
                    color="inherit"
                    size="small"
                    onClick={() => handleOpenTransferStoreModal(row.values._id)}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Return article to warehouse" arrow>
                  <IconButton
                    sx={{
                      '&:hover': { background: theme.colors.error.lighter },
                      color: theme.palette.error.main,
                    }}
                    color="inherit"
                    size="small"
                    onClick={() =>
                      handleOpenTransferWarehouseModal(row.values._id)
                    }
                  >
                    <SettingsBackupRestoreIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {(currentUser.roles === 'ADMIN' || currentUser.store === id) && (
              <Tooltip title="Selling article" arrow>
                <IconButton
                  disabled={row.original.soldAt}
                  sx={{
                    '&:hover': { background: theme.colors.error.lighter },
                    color: theme.palette.error.main,
                  }}
                  color="inherit"
                  size="small"
                  onClick={() => handleOpenSellModal(row.values._id)}
                >
                  <SellIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
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
        FilterElement={ArticlesFilter}
        data={data.body.data}
        columnInfo={columnInfo}
        onPageChange={onPageChange}
        totalCount={data.body.meta.itemCount}
        enableSort
        enableSelect
        noDataText="No existing article."
        ExtraElement={
          currentUser.roles === 'ADMIN' ? (
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => handleOpen(id)}
            >
              Add an article
            </Button>
          ) : (
            <></>
          )
        }
      />
      {openModal && (
        <AddArticleModal open={openModal} onClose={setOpenModal} storeId={id} />
      )}
      {articleId && openEditModal && (
        <EditArticleModal
          open={openEditModal}
          onClose={setOpenEditModal}
          articleId={articleId}
        />
      )}
      {articleId && openSellModal && (
        <SellArticleModal
          open={openSellModal}
          onClose={setOpenSellModal}
          articleId={articleId}
        />
      )}
      {articleId && openDeleteModal && (
        <ConfirmDialog
          title="Article deletion"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteWarehouse}
        >
          Are you sure you want to delete this article?
        </ConfirmDialog>
      )}
      {articleId && openTransferWarehouseModal && (
        <ConfirmDialog
          title="Transfer to warehouse"
          open={openTransferWarehouseModal}
          setOpen={setOpenTransferWarehouseModal}
          onConfirm={handleTransferToWarehouse}
        >
          Are you sure you want to tranfer this article to the original
          warehouse?
        </ConfirmDialog>
      )}
      {articleId && openTransferStoreModal && (
        <TransferArticleToStoreModal
          open={openTransferStoreModal}
          onClose={setOpenTransferStoreModal}
          articleId={articleId}
        />
      )}
    </Card>
  )
}

export default ArticlesTable
