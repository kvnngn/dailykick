import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import Logo from 'src/components/LogoSign'
import { useSignUp } from 'src/hooks/api/auth'
import { hashPassword } from 'src/utils'
import { GLOBAL } from 'src/constants'
import { useSnackbar } from 'src/hooks/common'
import { ROUTES } from '../../routes'

const Register = () => {
  const navigate = useNavigate()
  const { mutateAsync: signUp } = useSignUp()
  const { showErrorSnackbar } = useSnackbar()

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    isValid,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email has to be valid')
        .max(255)
        .required('Email is mandatory'),
      firstname: Yup.string().max(255).required('Firstname is mandatory'),
      lastname: Yup.string().max(255).required('Lastname is mandatory'),
      password: Yup.string().max(255).required('Password is mandatory'),
    }),
    onSubmit: async (v) => {
      try {
        const data = await signUp({
          ...v,
          password: hashPassword(v.password),
        })
        localStorage.setItem(GLOBAL.ACCESS_TOKEN, data.token)
        localStorage.setItem(GLOBAL.USER_ID, data.userId)
        navigate('/dashboard')
      } catch (e: any) {
        console.log(e.response?.data?.message)
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            case 'The account with the provided email currently exists. Please choose another one.':
              showErrorSnackbar(
                'The account with the provided email currently exists. Please choose another one.',
              )
              setFieldError('email', 'Email is already taken')
              break
            default:
              showErrorSnackbar('An error occured')
              break
          }
        }
      }
    },
  })

  return (
    <>
      <Helmet>Sign up | Daily Kicks</Helmet>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Logo />

              <Typography color="textPrimary" variant="h4">
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.firstname && errors.firstname)}
              fullWidth
              helperText={
                touched.firstname &&
                errors.firstname &&
                "Firstname field can't be empty"
              }
              label="Firstname"
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
              helperText={
                touched.lastname && errors.lastname && "Lastname field can't be empty"
              }
              label="Lastname"
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
              helperText={
                touched.email && errors.email && "Email field can't be empty"
              }
              label="Email address"
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
              helperText={
                touched.password && errors.password && "Password field can't be empty"
              }
              label="Password"
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
                disabled={isSubmitting || !isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up
              </Button>
            </Box>
            <Typography
              variant="caption"
              color="primary"
              onClick={() => navigate(ROUTES.AUTH.SIGNIN, { replace: true })}
              sx={{ cursor: 'pointer' }}
            >
              Already signed in?
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Register
