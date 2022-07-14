import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Logo from 'src/components/LogoSign'
import { useNavigate } from 'react-router'
import { useSignIn } from 'src/hooks/api/auth'
import { hashPassword } from 'src/utils'
import { GLOBAL } from 'src/constants'
import { ROUTES } from 'src/routes'
import { useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'src/hooks/common'

const Login = () => {
  const navigate = useNavigate()
  const { mutateAsync: login } = useSignIn()
  const [searchParams] = useSearchParams()
  const { showErrorSnackbar } = useSnackbar()
  const externalCallback = searchParams.get('callbackUrl')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is invalid')
        .max(255)
        .required('Email is mandatory'),
      password: Yup.string().max(255).required('Password is mandatory'),
    }),
    onSubmit: async (v) => {
      try {
        const response = await login({
          email: v.email,
          password: hashPassword(v.password),
        })
        if (response) {
          const body = response
          if (body.token && body.expires) {
            localStorage.setItem(GLOBAL.ACCESS_TOKEN, body.token)
            localStorage.setItem(GLOBAL.USER_ID, body.userId)
            localStorage.setItem(
              GLOBAL.ACCESS_TOKEN_EXPIRED,
              body.expires.toString(),
            )
            if (externalCallback) {
              window.location.href = `${window.location.origin}${externalCallback}`
            } else {
              if (body.store) {
                navigate(`${ROUTES.MANAGEMENT.MY_STORE}/${body.store}`)
              } else {
                navigate(ROUTES.DASHBOARD.ROOT)
              }
            }
          }
        }
      } catch (e: any) {
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            case 'Could not authenticate. Please try again.':
              showErrorSnackbar(
                'Log in failed. Your email address or password seem incorrect',
              )
              return
            default:
              showErrorSnackbar('Log in failed.')
              return
          }
        }
      }
    },
  })

  return (
    <>
      <Helmet>
        <title>Log in | Daily Kicks</title>
      </Helmet>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Logo />
              <Typography color="textPrimary" variant="h4">
                Log in
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                "Email field can't be empty"
              }
              label="Email address"
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
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                "Password field can't be empty"
              }
              label="Password"
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
                disabled={formik.isSubmitting || !formik.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log in
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="primary"
              onClick={() => navigate(ROUTES.AUTH.SIGNUP, { replace: true })}
              sx={{ cursor: 'pointer' }}
            >
              I do not have an account yet
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Login
