import { Helmet } from 'react-helmet-async'
import { Container, Grid } from '@mui/material'
import Footer from 'src/components/Footer'

import AccountBalance from './account-balance'
import SellingStoreSummary from './selling-store-summary'
import SellingWarehouseSummary from './selling-warehouse-summary'

function DashboardOverview() {
  return (
    <>
      <Helmet>
        <title>Overview</title>
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
    </>
  )
}

export default DashboardOverview
