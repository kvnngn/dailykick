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
import { GLOBAL } from 'src/constants';
import { hashPassword } from 'src/utils';
import * as Yup from 'yup';
import { useSnackbar } from 'src/hooks/common';
import { useCreateWarehouse } from 'src/hooks/api/management/warehouse';
import { useCurrentUser } from 'src/hooks/api/common';

function AddWarehouseModal(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const { mutateAsync: createWarehouse } = useCreateWarehouse();
  const { showErrorSnackbar } = useSnackbar();
  const currentUser = useCurrentUser();
  console.log(currentUser);
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
        console.log({ v });
        await createWarehouse({
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
        <DialogTitle>Création d'un nouveau dépot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez indiquer le nom de votre dépot.
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
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Créer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddWarehouseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddWarehouseModal;
