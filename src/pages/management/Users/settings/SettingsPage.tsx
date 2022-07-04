import { Helmet } from 'react-helmet-async'
import {
  Container,
  Tabs,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import Text from 'src/components/Text'
import { useCurrentInfo } from '../../../../hooks/api/common'

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
)

function SettingsPage() {
  const { currentUser } = useCurrentInfo()

  return (
    <>
      <Helmet>
        <title>Paramètres</title>
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <Box
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="h4" gutterBottom>
                        Détails personnels
                      </Typography>
                      <Typography variant="subtitle2">
                        Gérer les informations relatives à vos données
                        personnelles
                      </Typography>
                    </Box>
                    <Button variant="text" startIcon={<EditTwoToneIcon />}>
                      Mettre à jour
                    </Button>
                  </Box>
                  <Divider />
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="subtitle2">
                      <Grid container spacing={0}>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Nom:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>{currentUser.lastname}</b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Prénom:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>{currentUser.firstname}</b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Adresse mail:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>{currentUser.email}</b>
                          </Text>
                        </Grid>
                        {currentUser.store && (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              md={3}
                              textAlign={{ sm: 'right' }}
                            >
                              <Box pr={3} pb={2}>
                                ID Magasin:
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                              <Text color="black">
                                <b>{currentUser.store}</b>
                              </Text>
                            </Grid>
                          </>
                        )}
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Rôle:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>{currentUser.roles}</b>
                          </Text>
                        </Grid>
                      </Grid>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SettingsPage
