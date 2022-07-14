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
      articleId: Yup.string().required('Article Id field is mandatory'),
      updatedBy: Yup.string().required('User ID field is mandatory'),
      transferPrice: Yup.number().required('Transfer price field is mandatory'),
      store: Yup.string().required('Store ID field is mandatory'),
    }),

    onSubmit: async (v) => {
      try {
        await transferArticle(v)
        handleClose()
      } catch (e: any) {
        if (e.response?.data?.message) {
          switch (e.response.data.message) {
            default:
              showErrorSnackbar('An error occured')
              break
          }
        }
      }
    },
  })
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Withdrawal of article from warehouse to store</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please indicate the release price and the store recipient.
          </DialogContentText>
          <TextField
            fullWidth
            label="Product"
            margin="normal"
            name="product"
            disabled={true}
            onBlur={handleBlur}
            onChange={handleChange}
            value={_.isObject(data.product) ? data.product.name : data.product}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Size"
            margin="normal"
            name="size"
            disabled={true}
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.size}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="SKU"
            margin="normal"
            name="sku"
            disabled={true}
            onBlur={handleBlur}
            onChange={handleChange}
            value={_.isObject(data.product) ? data.product.sku : data.product}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Store price"
            margin="normal"
            name="storePrice"
            disabled={true}
            onBlur={handleBlur}
            onChange={handleChange}
            value={data.storePrice}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
          />
          <TextField
            error={Boolean(touched.transferPrice && errors.transferPrice)}
            fullWidth
            helperText={
              touched.transferPrice &&
              errors.transferPrice &&
              "Transfer price field can't be empty"
            }
            label="Release price"
            type="number"
            margin="normal"
            name="transferPrice"
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
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
                helperText={
                  touched.store && errors.store && "Store field can't be empty"
                }
                label="Store"
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
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Confirm
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
