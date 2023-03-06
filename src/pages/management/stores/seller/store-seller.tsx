import { Container, Grid } from '@mui/material'
import { FC } from 'react'
import Footer from '../../../../components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import SellersTable from './sellers-table'

declare type StoreSellerProps = {
  id: string
}

const StoreSeller: FC<StoreSellerProps> = ({ id }) => {
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
              <SellersTable id={id} />
            </SuspenseBox>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default StoreSeller
