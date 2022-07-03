import { FC, ReactNode, useMemo } from 'react'
import { Box, alpha, lighten, useTheme } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from './Sidebar'
import Header from './Header'
import PageHeader from 'src/layouts/SidebarLayout/PageHeader'
import PageTitleWrapper from 'src/layouts/SidebarLayout/PageTitleWrapper'
import { includesPath, ROUTES } from 'src/routes'

interface SidebarLayoutProps {
  children?: ReactNode
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme()

  const { pathname } = useLocation()
  const title = useMemo<string | undefined>(() => {
    switch (true) {
      case includesPath(ROUTES.DASHBOARD, pathname):
        return "Vue d'ensemble"
      case pathname === ROUTES.MANAGEMENT.WAREHOUSES:
        return 'Dépots'
      case pathname === ROUTES.MANAGEMENT.PRODUCTS:
        return 'Produits'
      case includesPath(ROUTES.PROFILE, pathname):
        return 'Mon profil'
      default:
        return undefined
    }
  }, [pathname])

  const subTitle = useMemo<Array<string> | string | undefined>(() => {
    console.log({ pathname })
    switch (true) {
      case pathname === ROUTES.MANAGEMENT.WAREHOUSES:
        return 'Gérer vos différents entrepots et leurs stocks'
      case pathname === ROUTES.MANAGEMENT.PRODUCTS:
        return 'Définissez les produits disponibles sur votre site'
      default:
        return undefined
    }
  }, [pathname])

  const canGoBack = useMemo<boolean>(() => {
    switch (true) {
      // case includesPath(ROUTES.MANAGEMENT, pathname):
      //   return true
      default:
        return false
    }
  }, [pathname])

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15,
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1,
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05,
                  )}`,
          },
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        >
          <Box display="block">
            {title && (
              <PageTitleWrapper>
                <PageHeader
                  title={title}
                  subTitle={subTitle}
                  canGoBack={canGoBack}
                />
              </PageTitleWrapper>
            )}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SidebarLayout
