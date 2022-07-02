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
import { useGetProducts } from 'src/hooks/api/management/product'
import { useCurrentUser } from 'src/hooks/api/common'
import { LoadingButton } from '@mui/lab'
import { useSetRecoilState } from 'recoil'
import { productNameState } from '../../../../atoms/global'
import InputAdornment from '@mui/material/InputAdornment'
import useCreateArticle from '../../../../hooks/api/management/article/mutation/useCreateArticle'

function AddArticleModal(props) {
  const { onClose, open, articleId } = props

  const handleClose = () => {
    onClose()
  }

  const { mutateAsync: createArticle } = useCreateArticle()
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
      warehouse: articleId,
      storehousePrice: 0,
      size: 0,
      sku: null,
    },
    validationSchema: Yup.object({
      product: Yup.string().required('Le produit est obligatoire'),
      createdBy: Yup.string().required('Votre utilisateur ID est obligatoire'),
      warehouse: Yup.string().required("L'ID du depot est obligatoire"),
      storehousePrice: Yup.number(),
      size: Yup.number(),
      sku: Yup.string().required('Le SKU est obligatoire'),
    }),

    onSubmit: async (v) => {
      try {
        console.log({ v })
        await createArticle(v)
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
                setFieldValue('product', value._id)
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
          <TextField
            error={Boolean(touched.sku && errors.sku)}
            fullWidth
            helperText={touched.sku && errors.sku}
            label="SKU"
            margin="normal"
            name="sku"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.sku}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.storehousePrice && errors.storehousePrice)}
            fullWidth
            helperText={touched.storehousePrice && errors.storehousePrice}
            label="Prix dépot"
            type="number"
            margin="normal"
            name="storehousePrice"
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            value={values.storehousePrice}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.size && errors.size)}
            fullWidth
            helperText={touched.size && errors.size}
            label="Taille"
            type="number"
            margin="normal"
            name="size"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.size}
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
  )
}

AddArticleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
}

export default AddArticleModal
