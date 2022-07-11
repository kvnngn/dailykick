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
import useDeleteArticle from '../../../../hooks/api/management/article/mutation/useDeleteArticle'
import { useGetArticles } from '../../../../hooks/api/management/article'
import EditArticleModal from '../edit/EditArticleModal'
import AddArticleModal from '../add/AddArticleModal'
import ArticlesFilter from './ArticlesFilter'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TransferArticleModal from '../transfer/TransferArticleModal'

type ArticlesTableProps = {
  id: string
}

const ArticlesTable: FC<ArticlesTableProps> = ({ id }) => {
  const theme = useTheme()
  const { data, onPageChange } = useGetArticles(id)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openTransferModal, setOpenTransferModal] = useState<boolean>(false)
  const [articleId, setArticleId] = useState<string>(null)
  const { mutateAsync: deleteArticle } = useDeleteArticle()
  const navigate = useNavigate()

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

  const handleOpenTransferModal = (id: string) => {
    if (!openTransferModal) {
      setArticleId(id)
      setOpenTransferModal(true)
    }
  }

  const handleDeleteArticle = async () => {
    await deleteArticle({ id: articleId })
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
        Header: 'Supplier price',
        accessor: 'warehousePrice' as const,
        disableSortBy: false,
        Cell: ({ value }) => `AED ${value}`,
      },
      {
        Header: 'Size',
        accessor: 'size' as const,
        disableSortBy: true,
      },
      {
        Header: 'Transferred on',
        accessor: 'transferedAt' as const,
        disableSortBy: true,
        Cell: ({ value, row }) =>
          value
            ? `${format(new Date(value), 'dd/MM/yyyy', {
                locale: fr,
              })} -> ${row.original.store.name} (AED ${
                row.original.transferPrice
              })`
            : 'No',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
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
                disabled={row.original.transferedAt}
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
            <Tooltip title="Sortir l'article" arrow>
              <IconButton
                disabled={row.original.transferedAt}
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main,
                }}
                color="inherit"
                size="small"
                onClick={() => handleOpenTransferModal(row.values._id)}
              >
                <ArrowForwardIcon fontSize="small" />
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
        FilterElement={ArticlesFilter}
        data={data.body.data}
        columnInfo={columnInfo}
        onPageChange={onPageChange}
        totalCount={data.body.meta.itemCount}
        enableSort
        enableSelect
        noDataText="No existing article."
        ExtraElement={
          <Button
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen(id)}
          >
            Add article
          </Button>
        }
      />
      {openModal && (
        <AddArticleModal
          open={openModal}
          onClose={setOpenModal}
          warehouseId={id}
        />
      )}
      {articleId && openEditModal && (
        <EditArticleModal
          open={openEditModal}
          onClose={setOpenEditModal}
          articleId={articleId}
        />
      )}
      {articleId && openTransferModal && (
        <TransferArticleModal
          open={openTransferModal}
          onClose={setOpenTransferModal}
          articleId={articleId}
        />
      )}
      {articleId && openDeleteModal && (
        <ConfirmDialog
          title="Suppression d'article"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteArticle}
        >
          Are you sure you want to delete this article?
        </ConfirmDialog>
      )}
    </Card>
  )
}

export default ArticlesTable
