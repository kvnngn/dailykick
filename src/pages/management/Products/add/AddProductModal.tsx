import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Box,
  Autocomplete,
  createFilterOptions
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'src/hooks/common';
import { useCreateProduct } from 'src/hooks/api/management/product';
import { useCurrentUser } from 'src/hooks/api/common';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../../components/FileInput';
import useGetBrandModels from '../../../../hooks/api/management/brandModel/query/useGetBrandModels';
import useGetBrands from '../../../../hooks/api/management/brand/query/useGetBrands';

export const productColors = [
  { value: 'red', name: 'rouge' },
  { value: 'orange', name: 'orange' },
  { value: 'yellow', name: 'jaune' },
  { value: 'green', name: 'vert' },
  { value: 'blue', name: 'bleu' },
  { value: 'purple', name: 'violet' },
  { value: 'Pink', name: 'rose' },
  { value: 'black', name: 'noir' },
  { value: 'white', name: 'blanc' },
  { value: 'brown', name: 'marron' },
  { value: 'Grey', name: 'gris' },
  { value: 'azure', name: 'azur' },
  { value: 'skyblue', name: 'bleu ciel' },
  { value: 'navyblue', name: 'bleu marine' }
];

const filter = createFilterOptions<Brand | BrandModel>();

function AddProductModal(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const { mutateAsync: createProduct } = useCreateProduct();
  const { data: brandModels } = useGetBrandModels();
  const { data: brands } = useGetBrands();
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
    setFieldValue,
    setFieldError
  } = useFormik({
    initialValues: {
      brand: null,
      brandModel: null,
      image_url: null,
      colors: ['white'],
      createdBy: currentUser.data._id
    },
    validationSchema: Yup.object({
      brand: Yup.string().required('La marque est obligatoire'),
      brandModel: Yup.string().required('Le modele est obligatoire'),
      image_url: Yup.string().required('Une photo est obligatoire'),
      colors: Yup.array().required('Une couleur est obligatoire'),
      createdBy: Yup.string().required('Votre ID est obligatoire')
    }),

    onSubmit: async (v) => {
      try {
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
          <Autocomplete
            onChange={(e, value: Brand) => {
              if (value) {
                setFieldValue('brand', value.name);
              } else {
                setFieldValue('brand', null);
              }
            }}
            disablePortal
            options={brands}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.name
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  name: inputValue,
                  createdAt: new Date(),
                  updatedAt: new Date()
                });
              }

              return filtered;
            }}
            getOptionLabel={(option: Brand) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
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
            )}
          />
          <Autocomplete
            onChange={(e, value: BrandModel) => {
              if (value) {
                setFieldValue('brandModel', value.name);
              } else {
                setFieldValue('brandModel', null);
              }
            }}
            disablePortal
            options={brandModels}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.name
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  name: inputValue,
                  createdAt: new Date(),
                  updatedAt: new Date()
                });
              }

              return filtered;
            }}
            getOptionLabel={(option: Brand) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
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
            )}
          />
          <TextField
            sx={{ width: 300 }}
            select
            label="Couleur(s)"
            placeholder="Couleur(s)"
            name="colors"
            error={Boolean(touched.colors && errors.colors)}
            helperText={touched.colors && errors.colors}
            onBlur={handleBlur}
            SelectProps={{
              multiple: true,
              value: values.colors,
              onChange: handleChange
            }}
          >
            {productColors.map((color) => (
              <MenuItem key={color.name} value={color.value}>
                {color.name}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={2}>
            <FileInput
              selectedImage={values.image_url}
              setSelectedImage={(file: any) => setFieldValue('image_url', file)}
            />
          </Box>
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
