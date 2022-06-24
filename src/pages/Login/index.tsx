import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/LogoSign';
import { useNavigate } from 'react-router';
import { useSignIn } from 'src/hooks/api/auth';
import { hashPassword } from 'src/utils';
import { GLOBAL } from 'src/constants';
import { ROUTES } from 'src/routes';
import { useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'src/hooks/common';

const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync: login } = useSignIn();
  const [searchParams] = useSearchParams();
  const { showErrorSnackbar } = useSnackbar();
  const externalCallback = searchParams.get('callbackUrl');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalide')
        .max(255)
        .required('Email est obligatoire'),
      password: Yup.string()
        .max(255)
        .required('Le mot de passe est obligatoire')
    }),
    onSubmit: async (v) => {
      try {
        const response = await login({
          email: v.email,
          password: hashPassword(v.password)
        });
        if (response) {
          const body = response;
          if (body.token && body.expires) {
            console.log({ body });
            localStorage.setItem(GLOBAL.ACCESS_TOKEN, body.token);
            localStorage.setItem(GLOBAL.USER_ID, body.userId);
            localStorage.setItem(
              GLOBAL.ACCESS_TOKEN_EXPIRED,
              body.expires.toString()
            );
            if (externalCallback) {
              window.location.href = `${window.location.origin}${externalCallback}`;
            } else {
              navigate(ROUTES.DASHBOARD.ROOT);
            }
          }
        }
      } catch (e: any) {
        console.log({ e });
        console.log(e.response?.data?.message);
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            case 'Could not authenticate. Please try again.':
              showErrorSnackbar(
                'Connexion échoué. Votre email ou mot de passe semble incorrect'
              );
              return;
            default:
              showErrorSnackbar('Connexion échoué.');
              return;
          }
        }
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Connexion | Daily Kicks</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Logo />
              <Typography color="textPrimary" variant="h4">
                Connexion
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Adresse Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mot de passe"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Me connecter
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="primary"
              onClick={() => navigate(ROUTES.AUTH.SIGNUP, { replace: true })}
              sx={{ cursor: 'pointer' }}
            >
              Je n'ai pas de compte
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
