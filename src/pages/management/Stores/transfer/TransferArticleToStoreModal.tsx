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
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { LoadingButton } from '@mui/lab'
import {
  useGetArticle,
  useTransferArticle,
} from '../../../../hooks/api/management/article'
import _ from 'lodash'
import Text from 'src/components/Text'
import { useGetStores } from '../../../../hooks/api/management/store'

declare type TransferArticleToStoreModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  articleId: string
}

const TransferArticleToStoreModal: FC<TransferArticleToStoreModalProps> = ({
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

  useEffect(() => {
    console.log(stores.body.data)
  }, [stores?.body?.data])

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
      transferPrice: 0,
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
        <DialogTitle>Transfer of article to another store</DialogTitle>
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Product:
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
                Size:
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
                <b>
                  {typeof data.product === 'object' ? data.product.sku : '-'}
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Supplier price:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>AED {data.warehousePrice}</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
        <DialogContent>
          <DialogContentText>
            Please indicate the store recipient.
          </DialogContentText>
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

TransferArticleToStoreModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
}

export default TransferArticleToStoreModal
