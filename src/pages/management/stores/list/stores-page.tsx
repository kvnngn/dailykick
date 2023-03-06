import { Grid, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Footer from 'src/components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import StoresTable from './stores-table'

function StoresPage() {
  return (
    <>
      <Helmet>
        <title>Stores</title>
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
              <StoresTable />
            </SuspenseBox>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default StoresPage
