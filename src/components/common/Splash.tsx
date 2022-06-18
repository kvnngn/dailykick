import React from 'react';
import { Backdrop, Box } from '@mui/material';
import DKLogo from '../../assets/images/logo.jpeg';

const Splash: React.FC = () => (
  <Backdrop
    open
    sx={{
      backgroundColor: '#00000080',
      zIndex: (theme) => theme.zIndex.drawer + 1
    }}
  >
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={DKLogo} width={100} />{' '}
    </Box>
  </Backdrop>
);

export default React.memo(Splash);
