import { FC, useMemo } from 'react'
import { Divider, Card } from '@mui/material'

import { DataPaginationTable, DKTableColumnInfo } from 'src/components/Table'
import { useGetStoreInventory } from '../../../../hooks/api/management/article'

type ProductsTableProps = {
  id: string
}

const ProductsTable: FC<ProductsTableProps> = ({ id }) => {
  const { data, onPageChange } = useGetStoreInventory(id)

  const columnInfo = useMemo<Array<DKTableColumnInfo>>(
    () => [
      {
        Header: 'Produit',
        accessor: 'product' as const,
        disableSortBy: true,
        Cell: ({ value }) => value.name,
      },
      {
        Header: 'Quantité',
        accessor: 'total' as const,
        disableSortBy: true,
      },
      {
        Header: 'Taille(s) disponible(s)',
        accessor: 'sizes' as const,
        disableSortBy: true,
        Cell: ({ value }) => value.join(', '),
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
        noDataText="Aucun article existant."
      />
    </Card>
  )
}

export default ProductsTable
