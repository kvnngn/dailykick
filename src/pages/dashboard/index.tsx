import { Helmet } from 'react-helmet-async'
import { Container, Grid } from '@mui/material'
import Footer from 'src/components/Footer'

import AccountBalance from './AccountBalance'
import SellingStoreSummary from './SellingStoreSummary'
import SellingWarehouseSummary from './SellingWarehouseSummary'

function DashboardOverview() {
  return (
    <>
      <Helmet>
        <title>Vue d'ensemble</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item xs={12}>
            <SellingWarehouseSummary />
          </Grid>
          <Grid item xs={12}>
            <SellingStoreSummary />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardOverview
