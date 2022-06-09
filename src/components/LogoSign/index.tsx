import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DKLogo from '../../assets/images/logo.jpeg';

function Logo() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Typography component={Link} to="/">
          <img src={DKLogo} width={100} />
        </Typography>{' '}
      </Grid>
    </Grid>
  );
}

export default Logo;
