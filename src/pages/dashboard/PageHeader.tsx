import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'Nguyen Kevin',
    avatar: '/static/images/avatars/4.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bonjour {user.name}, voici un recapitulatif des dernières ventes!
        </Typography>
        <Typography variant="subtitle2">
          Gérez vos stocks de produits en quelques clics.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
