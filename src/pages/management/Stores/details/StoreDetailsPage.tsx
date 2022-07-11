import { useState, ChangeEvent, useEffect, useMemo } from 'react'
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
import { useCurrentInfo } from '../../../../hooks/api/common'

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
)

function StoreDetailsPage() {
  const [currentTab, setCurrentTab] = useState<string>('Inventory')
  const { id } = useParams()
  const { data } = useGetStore(id)
  const { currentUser } = useCurrentInfo()

  const tabs = useMemo(() => {
    const tabs = [
      { value: 'Inventory', label: 'Inventory' },
      { value: 'Articles', label: 'Articles' },
    ]
    if (currentUser.roles === 'ADMIN') {
      tabs.push({ value: 'Sellers', label: 'Sellers' })
    }
    return tabs
  }, [currentUser?.roles])

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <>
      <Helmet>
        <title> {data.name} - Détails</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={data.name} subTitle={currentTab} />
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
            {currentTab === 'Inventory' && <ProductsTable id={id} />}
            {currentTab === 'Articles' && <StoreArticle id={id} />}
            {currentTab === 'Sellers' && <StoreSeller id={id} />}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default StoreDetailsPage
