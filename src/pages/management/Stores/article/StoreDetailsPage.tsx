import { Container, Grid } from '@mui/material'
import { FC } from 'react'
import { useParams } from 'react-router'
import Footer from '../../../../components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import { useGetStore } from '../../../../hooks/api/management/store'
import PageHeader from '../../../../layouts/SidebarLayout/PageHeader'
import PageTitleWrapper from '../../../../layouts/SidebarLayout/PageTitleWrapper'
import ArticlesTable from './ArticlesTable'

const StoreDetailsPage: FC = () => {
  const { id } = useParams()
  const { data } = useGetStore(id)

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

export default StoreDetailsPage
