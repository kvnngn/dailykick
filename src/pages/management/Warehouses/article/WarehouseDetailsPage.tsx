import { Container, Grid } from '@mui/material'
import { FC } from 'react'
import { useParams } from 'react-router'
import Footer from '../../../../components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import WarehouseArticlesTable from './WarehouseArticlesTable'

const WarehouseDetailsPage: FC = () => {
  let { id } = useParams()
  
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
              <WarehouseArticlesTable id={id} />
            </SuspenseBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default WarehouseDetailsPage
