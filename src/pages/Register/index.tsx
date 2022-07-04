import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import Logo from 'src/components/LogoSign';
import { useSignUp } from 'src/hooks/api/auth';
import { hashPassword } from 'src/utils';
import { GLOBAL } from 'src/constants';
import { useSnackbar } from 'src/hooks/common';
import { ROUTES } from '../../routes';

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: signUp } = useSignUp();
  const { showErrorSnackbar } = useSnackbar();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setFieldError
  } = useFormik({
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("L'email doit etre valide")
        .max(255)
        .required("L'email est obligatoire"),
      firstname: Yup.string().max(255).required('Le prénom est obligatoire'),
      lastname: Yup.string().max(255).required('Le nom est obligatoire'),
      password: Yup.string().max(255).required('Le mot de passe est obligatoire')
    }),
    onSubmit: async (v) => {
      try {
        const data = await signUp({
          ...v,
          password: hashPassword(v.password)
        });
        localStorage.setItem(GLOBAL.ACCESS_TOKEN, data.token);
        localStorage.setItem(GLOBAL.USER_ID, data.userId);
        navigate('/dashboard');
      } catch (e: any) {
        console.log(e.response?.data?.message)
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            case 'The account with the provided email currently exists. Please choose another one.':
              showErrorSnackbar('Compte déja existant');
              setFieldError(
                'email',
                'Un utilisateur avec cette adresse mail existe déja'
              );
              break;
            default:
              showErrorSnackbar('Une erreur est survenue');
              break;
          }
        }
      }
    }
  });

  return (
    <>
      <Helmet>S'inscrire | Daily Kicks</Helmet>
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
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Logo />

              <Typography color="textPrimary" variant="h4">
                Créer un nouveau compte
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Utilisez votre email pour créer un nouveau compte
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.firstname && errors.firstname)}
              fullWidth
              helperText={touched.firstname && errors.firstname}
              label="Nom"
              margin="normal"
              name="firstname"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstname}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.lastname && errors.lastname)}
              fullWidth
              helperText={touched.lastname && errors.lastname}
              label="Prenom"
              margin="normal"
              name="lastname"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Adresse Email"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Mot de passe"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Je m'inscris
              </Button>
            </Box>
            <Typography
              variant="caption"
              color="primary"
              onClick={() => navigate(ROUTES.AUTH.SIGNIN, { replace: true })}
              sx={{ cursor: 'pointer' }}
            >
              J'ai déja un compte
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
