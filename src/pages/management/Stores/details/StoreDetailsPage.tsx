import { useState, ChangeEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/layouts/SidebarLayout/PageTitleWrapper'
import { Container, Tabs, Tab, Grid } from '@mui/material'
import Footer from 'src/components/Footer'
import { styled } from '@mui/material/styles'
import StoreArticle from '../article/StoreArticle'
import { useParams } from 'react-router'
import { useGetStore } from '../../../../hooks/api/management/store'
import PageHeader from '../../../../layouts/SidebarLayout/PageHeader'
import StoreSeller from '../seller/StoreSeller'
import ProductsTable from '../product/ProductsTable'

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
)

function StoreDetailsPage() {
  const [currentTab, setCurrentTab] = useState<string>('Inventaire')
  const { id } = useParams()
  const { data } = useGetStore(id)

  const tabs = [
    { value: 'Inventaire', label: 'Inventaire' },
    { value: 'Articles', label: 'Articles' },
    { value: 'Vendeurs', label: 'Vendeurs' },
  ]

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <>
      <Helmet>
        <title> {data.name} - Détails</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={data.name} subTitle={currentTab} canGoBack={true} />
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'Inventaire' && <ProductsTable id={id} />}
            {currentTab === 'Articles' && <StoreArticle id={id} />}
            {currentTab === 'Vendeurs' && <StoreSeller id={id} />}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default StoreDetailsPage
