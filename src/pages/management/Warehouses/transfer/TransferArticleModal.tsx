import PropTypes from 'prop-types'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
  InputAdornment,
  Box,
  Grid,
  Typography,
  MenuItem,
  Autocomplete,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import { useCurrentUser } from 'src/hooks/api/common'
import { Dispatch, FC, SetStateAction } from 'react'
import { LoadingButton } from '@mui/lab'
import {
  useGetArticle,
  useTransferArticle,
} from '../../../../hooks/api/management/article'
import _ from 'lodash'
import Text from 'src/components/Text'
import { useGetStores } from '../../../../hooks/api/management/store'

declare type TransferArticleModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  articleId: string
}

const TransferArticleModal: FC<TransferArticleModalProps> = ({
  onClose,
  open,
  articleId,
}) => {
  const handleClose = () => {
    onClose(false)
  }

  const { mutateAsync: transferArticle } = useTransferArticle()
  const { data: stores } = useGetStores()

  const { data } = useGetArticle(articleId)
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
  } = useFormik({
    initialValues: {
      articleId: articleId,
      updatedBy: currentUser.data._id,
      store: undefined,
      transferPrice: data.warehousePrice,
    },
    validationSchema: Yup.object({
      articleId: Yup.string().required("L'ID de l'article est obligatoire"),
      updatedBy: Yup.string().required('Votre utilisateur ID est obligatoire'),
      transferPrice: Yup.number().required("L'ID du magasin est obligatoire"),
      store: Yup.string().required("L'ID du magasin est obligatoire"),
    }),

    onSubmit: async (v) => {
      try {
        await transferArticle(v)
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
        <DialogTitle>Retrait d'article de dépot vers magasin</DialogTitle>
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Produit:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>
                  {_.isObject(data.product) ? data.product.name : data.product}
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Taille:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{data.size}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                SKU:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{data.sku}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Prix dépot:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{data.warehousePrice}€</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
        <DialogContent>
          <DialogContentText>
            Veuillez indiquer le prix de sortie ainsi que le magasin
            destinataire.
          </DialogContentText>
          <TextField
            error={Boolean(touched.transferPrice && errors.transferPrice)}
            fullWidth
            helperText={touched.transferPrice && errors.transferPrice}
            label="Prix de vente"
            type="number"
            margin="normal"
            name="transferPrice"
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            value={values.transferPrice}
            variant="outlined"
          />
          <Autocomplete
            onChange={(e, value: Store) => {
              if (value) {
                setFieldValue('store', value._id)
              } else {
                setFieldValue('store', null)
              }
            }}
            disablePortal
            options={stores.body.data}
            getOptionLabel={(option: Store) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(touched.store && errors.store)}
                fullWidth
                helperText={touched.store && errors.store}
                label="Marque"
                margin="normal"
                name="store"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.store}
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
            Confirmer
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

TransferArticleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
}

export default TransferArticleModal
