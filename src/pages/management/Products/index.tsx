import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import Products from './Products';

function ApplicationsProducts() {
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
            <Products />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsProducts;
