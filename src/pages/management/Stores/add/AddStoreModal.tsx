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
      name: Yup.string().required('Le nom est obligatoire'),
      createdBy: Yup.string().required('Votre ID est obligatoire')
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
              showErrorSnackbar('Une erreur est survenue');
              break;
          }
        }
      }
    }
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Création d'un nouveau magasin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez indiquer le nom de votre magasin.
          </DialogContentText>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Nom"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Créer
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
