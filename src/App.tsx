import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import { CssBaseline } from '@mui/material'
import ThemeProvider from './theme/ThemeProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Suspense } from 'react'
import { Splash } from './components/common'
import { SnackbarProvider } from 'notistack'
import Pages from './pages'
import { RecoilRoot } from 'recoil'

function App() {
  const queryClient = new QueryClient()

  return (
    <Suspense fallback={<Splash />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <SnackbarProvider
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              maxSnack={5}
              classes={{
                containerRoot: 'cc-snackbar-root',
                containerAnchorOriginTopRight: 'cc-snackbar-top-right',
              }}
            >
              <RecoilRoot>
                <Pages />
              </RecoilRoot>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  )
}
export default App
