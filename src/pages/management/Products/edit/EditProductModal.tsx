import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
  Box,
  DialogContentText,
  MenuItem,
  createFilterOptions
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'src/hooks/common';
import { useGetProduct } from 'src/hooks/api/management/product';
import { useCurrentUser } from 'src/hooks/api/common';
import { Dispatch, FC, SetStateAction } from 'react';
import useUpdateProduct from 'src/hooks/api/management/product/mutation/useUpdateProduct';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../../components/FileInput';
import { productColors } from '../add/AddProductModal';
import useGetBrands from '../../../../hooks/api/management/brand/query/useGetBrands';
import useGetBrandModels from '../../../../hooks/api/management/brandModel/query/useGetBrandModels';

declare type EditProductModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  productId: string;
};

const filter = createFilterOptions<Brand | BrandModel>();

const EditProductModal: FC<EditProductModalProps> = ({
  onClose,
  open,
  productId
}) => {
  const handleClose = () => {
    onClose(false);
  };

  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { data: brandModels } = useGetBrandModels();
  const { data: brands } = useGetBrands();
  const { data } = useGetProduct(productId);
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
    setFieldError,
    setFieldValue
  } = useFormik({
    initialValues: {
      brand: data.brand.name,
      brandModel: data.brandModel.name,
      image_url: null,
      colors: data.colors
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
        console.log({ v });
        await updateProduct({
          original: data,
          changes: {}
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
        <DialogTitle>Modification d'un nouveau produit</DialogTitle>
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
            {data.image_url && !values.image_url && (
              <Box mt={2}>
                <div>Aperçu:</div>
                <img src={data.image_url} alt={data.image_url} height="100px" />
              </Box>
            )}
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
};

EditProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  productId: PropTypes.string.isRequired
};

export default EditProductModal;
