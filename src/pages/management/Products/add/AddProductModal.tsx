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
import { useCreateProduct } from 'src/hooks/api/management/product';
import { useCurrentUser } from 'src/hooks/api/common';
import { LoadingButton } from '@mui/lab';

function AddProductModal(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const { mutateAsync: createProduct } = useCreateProduct();
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
      brand: null,
      brandModel: null,
      image_urls: null,
      colors: null,
      createdBy: currentUser.data._id
    },
    validationSchema: Yup.object({
      brand: Yup.string().required('La marque est obligatoire'),
      brandModel: Yup.string().required('Le modele est obligatoire'),
      image_urls: Yup.string().required('La photo est obligatoire'),
      colors: Yup.string().required('Une couleur est obligatoire'),
      createdBy: Yup.string().required('Votre ID est obligatoire')
    }),

    onSubmit: async (v) => {
      try {
        console.log({ v });
        await createProduct({
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
        <DialogTitle>Création d'un nouveau produit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez indiquer les informations de produit.
          </DialogContentText>
          <TextField
            error={Boolean(touched.brand && errors.brand)}
            fullWidth
            helperText={touched.brand && errors.brand}
            label="Marque"
            margin="normal"
            name="brand"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.brand}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.brandModel && errors.brandModel)}
            fullWidth
            helperText={touched.brandModel && errors.brandModel}
            label="Modele"
            margin="normal"
            name="brandModel"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.brandModel}
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

AddProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddProductModal;
