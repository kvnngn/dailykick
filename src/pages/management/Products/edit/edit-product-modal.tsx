import PropTypes from 'prop-types'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
  Box,
  DialogContentText,
  MenuItem,
  createFilterOptions,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import { useGetProduct } from 'src/hooks/api/management/product'
import { useCurrentUser } from 'src/hooks/api/common'
import { Dispatch, FC, SetStateAction } from 'react'
import useUpdateProduct from 'src/hooks/api/management/product/mutation/useUpdateProduct'
import { LoadingButton } from '@mui/lab'
import FileInput from '../../../../components/FileInput'
import { productColors } from '../add/add-product-modal'
import useGetBrands from '../../../../hooks/api/management/brand/query/useGetBrands'
import useGetBrandModels from '../../../../hooks/api/management/brandModel/query/useGetBrandModels'
import _ from 'lodash'

declare type EditProductModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  productId: string
}

const filter = createFilterOptions<Brand | BrandModel | string>()

const EditProductModal: FC<EditProductModalProps> = ({
  onClose,
  open,
  productId,
}) => {
  const handleClose = () => {
    onClose(false)
  }

  const { mutateAsync: updateProduct } = useUpdateProduct()
  const { data: brandModels } = useGetBrandModels()
  const { data: brands } = useGetBrands()
  const { data } = useGetProduct(productId)
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      brand: _.isObject(data.brand) ? data.brand.name : null,
      brandModel: _.isObject(data.brandModel) ? data.brandModel.name : null,
      image_url: data.image_url,
      updatedBy: currentUser.data._id,
      sku: data.sku,
    },
    validationSchema: Yup.object({
      brand: Yup.string().required('Brand field is mandatory'),
      brandModel: Yup.string().required('Model field is mandatory'),
      updatedBy: Yup.string().required('updatedBy field is mandatory'),
      sku: Yup.string().required('SKU field is mandatory'),
    }),

    onSubmit: async (v) => {
      try {
        await updateProduct({
          original: data,
          changes: v,
        })
        handleClose()
      } catch (e: any) {
        if (e.response?.data?.status) {
          console.log(e.response?.data?.status)
          showErrorSnackbar('A product with this SKU already exists.')
        } else {
          showErrorSnackbar('An error occured')
        }
      }
    },
  })

  console.log({ values })
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update a product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide product information.
          </DialogContentText>
          <Autocomplete
            value={values.brand}
            onChange={(e, value: Brand) => {
              if (value) {
                setFieldValue('brand', value.name)
              } else {
                setFieldValue('brand', null)
              }
            }}
            disablePortal
            options={brands}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params
              const isExisting = options.some((option) =>
                _.isObject(option)
                  ? inputValue === option.name
                  : inputValue === option,
              )
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  name: inputValue,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                })
              }

              return filtered
            }}
            getOptionLabel={(option: BrandModel | Brand | string) =>
              _.isObject(option) ? option.name : option
            }
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(touched.brand && errors.brand)}
                fullWidth
                helperText={
                  touched.brand && errors.brand && "Brand field can't be empty"
                }
                label="Brand"
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
            value={values.brandModel}
            onBlur={handleBlur}
            onChange={(e, value: BrandModel) => {
              if (value) {
                setFieldValue('brandModel', value.name)
              } else {
                setFieldValue('brandModel', null)
              }
            }}
            disablePortal
            options={brandModels}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              const { inputValue } = params
              const isExisting = options.some((option) =>
                _.isObject(option)
                  ? inputValue === option.name
                  : inputValue === option,
              )
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  name: inputValue,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                })
              }

              return filtered
            }}
            getOptionLabel={(option: BrandModel | Brand | string) =>
              _.isObject(option) ? option.name : option
            }
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(touched.brandModel && errors.brandModel)}
                fullWidth
                helperText={
                  touched.brandModel &&
                  errors.brandModel &&
                  "Model field can't be empty"
                }
                label="Model"
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
            error={Boolean(touched.sku && errors.sku)}
            fullWidth
            helperText={touched.sku && errors.sku && "SKU field can't be empty"}
            label="SKU"
            margin="normal"
            name="sku"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.sku}
            variant="outlined"
          />
          <Box mt={2}>
            <FileInput
              selectedImage={values.image_url}
              setSelectedImage={(file: any) => setFieldValue('image_url', file)}
            />
            {/* {values?.image_url && (
              <Box mt={2}>
                <div>Aperçu:</div>
                <img
                  src={values.image_url}
                  alt={values.image_url}
                  height="100px"
                />
              </Box>
            )} */}
          </Box>
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

EditProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  productId: PropTypes.string.isRequired,
}

export default EditProductModal
