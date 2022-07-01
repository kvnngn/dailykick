import PropTypes from 'prop-types'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import {
  useCreateProduct,
  useGetProducts,
} from 'src/hooks/api/management/product'
import { useCurrentUser } from 'src/hooks/api/common'
import { LoadingButton } from '@mui/lab'
import { useSetRecoilState } from 'recoil'
import { productNameState } from '../../../../atoms/global'

function AddWarehouseArticleModal(props) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  const { mutateAsync: createProduct } = useCreateProduct()
  const setProductNameState = useSetRecoilState(productNameState)
  const { data: products } = useGetProducts()
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
      product: null,
      createdBy: currentUser.data._id,
    },
    validationSchema: Yup.object({
      product: Yup.string().required('Le produit est obligatoire'),
      createdBy: Yup.string().required('Votre ID est obligatoire'),
    }),

    onSubmit: async (v) => {
      try {
        console.log({ v })
        handleClose()
      } catch (e: any) {
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            default:
              showErrorSnackbar('Une erreur est survenue')
              break
          }
        }
      }
    },
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Création d'un nouvel article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez indiquer les informations de l'article.
          </DialogContentText>
          <Autocomplete
            onChange={(e, value: Product) => {
              console.log({ value })
              if (value) {
                setFieldValue('product', value.name)
              }
            }}
            disablePortal
            options={products.body.data}
            getOptionLabel={(option: Product) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(touched.product && errors.product)}
                fullWidth
                helperText={touched.product && errors.product}
                label="Produit"
                margin="normal"
                name="product"
                onBlur={handleBlur}
                onChange={(e) => {
                  if (!e.target.value) {
                    setProductNameState(undefined)
                  } else {
                    setProductNameState(e.target.value)
                  }
                  return handleChange
                }}
                value={values.product}
                variant="outlined"
              />
            )}
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
  )
}

AddWarehouseArticleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddWarehouseArticleModal
