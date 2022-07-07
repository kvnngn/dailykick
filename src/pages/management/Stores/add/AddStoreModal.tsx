import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'src/hooks/common';
import { useCreateStore } from 'src/hooks/api/management/store';
import { useCurrentUser } from 'src/hooks/api/common';
import { LoadingButton } from '@mui/lab';

function AddStoreModal(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const { mutateAsync: createStore } = useCreateStore();
  const { showErrorSnackbar } = useSnackbar();
  const currentUser = useCurrentUser();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    isSubmitting,
    setFieldError
  } = useFormik({
    initialValues: {
      name: '',
      createdBy: currentUser.data._id
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Lastname is mandatory'),
      createdBy: Yup.string().required('User ID field is mandatory')
    }),

    onSubmit: async (v) => {
      try {
        await createStore({
          ...v
        });
        handleClose();
      } catch (e: any) {
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            default:
              showErrorSnackbar('An error occured');
              break;
          }
        }
      }
    }
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new store</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez indiquer le nom de votre store.
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
  );
}

AddStoreModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddStoreModal;
