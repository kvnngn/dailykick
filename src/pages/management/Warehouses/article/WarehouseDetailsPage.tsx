import { Container, Grid } from '@mui/material'
import { FC } from 'react'
import { useParams } from 'react-router'
import Footer from '../../../../components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import { useGetWarehouse } from '../../../../hooks/api/management/warehouse'
import PageHeader from '../../../../layouts/SidebarLayout/PageHeader'
import PageTitleWrapper from '../../../../layouts/SidebarLayout/PageTitleWrapper'
import ArticlesTable from './ArticlesTable'

const WarehouseDetailsPage: FC = () => {
  const { id } = useParams()
  const { data } = useGetWarehouse(id)

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title={data.name}
          subTitle="Liste des articles"
          canGoBack={true}
        />
      </PageTitleWrapper>
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
              <ArticlesTable id={id} />
            </SuspenseBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default WarehouseDetailsPage
