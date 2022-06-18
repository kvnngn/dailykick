import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';
import { Splash } from './components/common';
import { SnackbarProvider } from 'notistack';
import Pages from './pages';

function App() {
  const queryClient = new QueryClient();

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
                containerAnchorOriginTopRight: 'cc-snackbar-top-right'
              }}
            >
              <Pages />
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
export default App;
