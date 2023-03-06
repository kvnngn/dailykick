import { SuspenseBox } from 'src/components/styled/suspense'
import { ProductsTable } from './products-table'

function Products() {
  return (
    <SuspenseBox>
      <ProductsTable />
    </SuspenseBox>
  )
}

export default Products
