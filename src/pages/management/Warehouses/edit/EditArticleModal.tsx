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
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'src/hooks/common'
import { useCurrentUser } from 'src/hooks/api/common'
import { Dispatch, FC, SetStateAction } from 'react'
import { LoadingButton } from '@mui/lab'
import useUpdateArticle from '../../../../hooks/api/management/article/mutation/useUpdateArticle'
import { useGetArticle } from '../../../../hooks/api/management/article'
import _ from 'lodash'

declare type EditArticleModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  articleId: string
}

const EditArticleModal: FC<EditArticleModalProps> = ({
  onClose,
  open,
  articleId,
}) => {
  const handleClose = () => {
    onClose(false)
  }

  const { mutateAsync: updateArticle } = useUpdateArticle()
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
  } = useFormik({
    initialValues: {
      product: _.isObject(data.product) ? data.product._id : data.product,
      updatedBy: currentUser.data._id,
      warehousePrice: data.warehousePrice,
      size: data.size,
    },
    validationSchema: Yup.object({
      product: Yup.string().required('Product ID field is mandatory'),
      updatedBy: Yup.string().required('User ID field is mandatory'),
      warehousePrice: Yup.number(),
      size: Yup.number(),
    }),

    onSubmit: async (v) => {
      try {
        await updateArticle({
          original: data,
          changes: v,
        })
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
        <DialogTitle>Editing article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the article information.
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
            error={Boolean(touched.warehousePrice && errors.warehousePrice)}
            fullWidth
            helperText={touched.warehousePrice && errors.warehousePrice}
            label="Supplier price"
            type="number"
            margin="normal"
            name="warehousePrice"
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
            value={values.warehousePrice}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.size && errors.size)}
            fullWidth
            helperText={touched.size && errors.size}
            label="Size"
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

EditArticleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
}

export default EditArticleModal
