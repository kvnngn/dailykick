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
  useSellArticle,
  useTransferArticle,
} from '../../../../hooks/api/management/article'
import _ from 'lodash'
import Text from 'src/components/Text'

declare type SellArticleModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  articleId: string
}

const SellArticleModal: FC<SellArticleModalProps> = ({
  onClose,
  open,
  articleId,
}) => {
  const handleClose = () => {
    onClose(false)
  }

  const { mutateAsync: transferArticle } = useSellArticle()

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
      sellingPrice: data.storePrice | 0,
    },
    validationSchema: Yup.object({
      articleId: Yup.string().required('ArticleId field is mandatory'),
      updatedBy: Yup.string().required('User ID field is mandatory'),
      sellingPrice: Yup.number().required('Store ID field is mandatory'),
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
        <DialogTitle>Selling article</DialogTitle>
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
                Store price:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{data.storePrice ? `${data.storePrice}AED` : 'Undefined'}</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
        <DialogContent>
          <DialogContentText>
            Please indicate the selling price
          </DialogContentText>
          <TextField
            error={Boolean(touched.sellingPrice && errors.sellingPrice)}
            fullWidth
            helperText={touched.sellingPrice && errors.sellingPrice}
            label="Selling price"
            type="number"
            margin="normal"
            name="sellingPrice"
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
            value={values.sellingPrice}
            variant="outlined"
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

SellArticleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
}

export default SellArticleModal
