import PropTypes from 'prop-types'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
  InputAdornment,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import { useCurrentUser } from 'src/hooks/api/common'
import { Dispatch, FC, SetStateAction } from 'react'
import { LoadingButton } from '@mui/lab'
import _ from 'lodash'
import {
  useUpdateUser,
  useGetUser,
} from '../../../../hooks/api/management/user'
import { hashPassword } from '../../../../utils'

declare type EditSellerModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  sellerId: string
}

const EditSellerModal: FC<EditSellerModalProps> = ({
  onClose,
  open,
  sellerId,
}) => {
  const handleClose = () => {
    onClose(false)
  }

  const { mutateAsync: updateUser } = useUpdateUser()
  const { data } = useGetUser(sellerId)
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
  } = useFormik({
    initialValues: {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: undefined,
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
        await updateUser({
          original: data,
          changes: { ...v, password: hashPassword(v.password) },
        })
        handleClose()
      } catch (e: any) {
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
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
        <DialogTitle>Update seller</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide seller information.
          </DialogContentText>
          <TextField
            error={Boolean(touched.firstname && errors.firstname)}
            fullWidth
            helperText={touched.firstname && errors.firstname}
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
            helperText={touched.lastname && errors.lastname}
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
            helperText={touched.email && errors.email}
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
            helperText={touched.password && errors.password}
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
            Update
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

EditSellerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  sellerId: PropTypes.string.isRequired,
}

export default EditSellerModal
