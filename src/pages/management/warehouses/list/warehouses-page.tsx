import { Grid, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { SuspenseBox } from '../../../../components/styled/suspense'
import WarehousesTable from './warehouses-table'

function WarehousesPage() {
  return (
    <>
      <Helmet>
        <title>Warehouses</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <SuspenseBox>
              <WarehousesTable />
            </SuspenseBox>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default WarehousesPage
