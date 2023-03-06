import { Container, Grid, styled, Tab, Tabs } from '@mui/material'
import { FC, useState, ChangeEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import { SuspenseBox } from '../../../../components/styled/suspense'
import { useGetWarehouse } from '../../../../hooks/api/management/warehouse'
import PageHeader from '../../../../layouts/SidebarLayout/PageHeader'
import PageTitleWrapper from '../../../../layouts/SidebarLayout/PageTitleWrapper'
import ArticlesTable from '../article/articles-table'
import ProductsTable from '../product/products-table'

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
)

const WarehouseDetailsPage: FC = () => {
  const { id } = useParams()
  const { data } = useGetWarehouse(id)
  const [currentTab, setCurrentTab] = useState<string>('Inventory')

  const tabs = [
    { value: 'Inventory', label: 'Inventory' },
    { value: 'Articles', label: 'Articles' },
  ]

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }
  return (
    <>
      <Helmet>
        <title>{data.name} - Détails</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={data.name} subTitle="Inventory" canGoBack={true} />
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
            {currentTab === 'Articles' && <ArticlesTable id={id} />}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default WarehouseDetailsPage
