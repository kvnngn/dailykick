import { Grid, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Footer from 'src/components/Footer'
import Products from './Products'

function ApplicationsProducts() {
  return (
    <>
      <Helmet>
        <title>Produits</title>
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
            <Products />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ApplicationsProducts
