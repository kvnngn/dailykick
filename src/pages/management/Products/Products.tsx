import ProductsTable from './ProductsTable';
import { SuspenseBox } from 'src/components/styled/suspense';

function Products() {
  return (
    <SuspenseBox>
      <ProductsTable />
    </SuspenseBox>
  );
}

export default Products;
