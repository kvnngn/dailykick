import PropTypes from 'prop-types'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import { useCurrentUser } from 'src/hooks/api/common'
import { LoadingButton } from '@mui/lab'
import { useCreateUser } from '../../../../hooks/api/management/user'
import { hashPassword } from '../../../../utils'

function AddSellerModal(props) {
  const { onClose, open, storeId } = props

  const handleClose = () => {
    onClose()
  }

  const { mutateAsync: createUser } = useCreateUser()
  const { showErrorSnackbar } = useSnackbar()
  const currentUser = useCurrentUser()

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    isSubmitting,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      password: undefined,
      store: storeId,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email has to be valid')
        .max(255)
        .required('Email is mandatory'),
      firstname: Yup.string().max(255).required('Firstname is mandatory'),
      lastname: Yup.string().max(255).required('Lastname is mandatory'),
      password: Yup.string().max(255).required('Password is mandatory'),
      store: Yup.string().required('Store ID field is mandatory'),
    }),

    onSubmit: async (v) => {
      try {
        await createUser({ ...v, password: hashPassword(v.password) })
        handleClose()
      } catch (e: any) {
        if (e.response?.data?.message) {
          console.log({ e })
          switch (e.response.data.message) {
            case 'The account with the provided email currently exists. Please choose another one.':
              showErrorSnackbar(e.response.data.message)
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
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new seller</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide seller information.
          </DialogContentText>
          <TextField
            error={Boolean(touched.firstname && errors.firstname)}
            fullWidth
            helperText={
              touched.firstname &&
              errors.firstname &&
              "Firstname field can't be empty"
            }
            label="Name"
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
              touched.lastname &&
              errors.lastname &&
              "Lastname field can't be empty"
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
            helperText={touched.password && "Password field can't be empty"}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

AddSellerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  storeId: PropTypes.string.isRequired,
}

export default AddSellerModal
