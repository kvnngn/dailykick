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
import { GLOBAL } from 'src/constants'
import { hashPassword } from 'src/utils'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import { useCreateWarehouse } from 'src/hooks/api/management/warehouse'
import { useCurrentUser } from 'src/hooks/api/common'
import { LoadingButton } from '@mui/lab'

function AddWarehouseModal(props) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  const { mutateAsync: createWarehouse } = useCreateWarehouse()
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
    setFieldError,
  } = useFormik({
    initialValues: {
      name: '',
      createdBy: currentUser.data._id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Lastname is mandatory'),
      createdBy: Yup.string().required('User ID field is mandatory'),
    }),

    onSubmit: async (v) => {
      try {
        await createWarehouse({
          ...v,
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
        <DialogTitle>Add a new warehouse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please indicate the name of your warehouse.
          </DialogContentText>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
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

AddWarehouseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddWarehouseModal
