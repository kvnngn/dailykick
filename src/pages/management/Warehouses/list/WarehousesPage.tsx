import { Grid, Container } from '@mui/material'
import Footer from 'src/components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import WarehousesTable from './WarehousesTable'

function WarehousesPage() {
  return (
    <>
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
      <Footer />
    </>
  )
}

export default WarehousesPage
