import { Container, Grid } from '@mui/material'
import { FC } from 'react'
import Footer from '../../../../components/Footer'
import { SuspenseBox } from '../../../../components/styled/suspense'
import ArticlesTable from './ArticlesTable'

declare type StoreArticleProps = {
  id: string
}

const StoreArticle: FC<StoreArticleProps> = ({ id }) => {
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
              <ArticlesTable id={id} />
            </SuspenseBox>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default StoreArticle
