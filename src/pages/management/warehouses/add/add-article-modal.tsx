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
  Grid,
} from '@mui/material'
import { FieldArray, Form, Formik, getIn, useFormik } from 'formik'
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
  const { onClose, open, warehouseId } = props

  const handleClose = () => {
    onClose()
  }

  const { mutateAsync: createArticle } = useCreateArticle()
  const setProductNameState = useSetRecoilState(productNameState)
  const { data: products } = useGetProducts()
  const { showErrorSnackbar } = useSnackbar()
  const currentUser = useCurrentUser()
  const validationSchema = Yup.object({
    product: Yup.string().required('Product is mandatory'),
    createdBy: Yup.string().required('User ID is mandatory'),
    warehouse: Yup.string(),
    store: Yup.string(),
    warehousePrice: Yup.number(),
    storePrice: Yup.number(),
    sizes: Yup.array().of(
      Yup.object().shape({
        size: Yup.number().required('Size is required'),
        quantity: Yup.number().required('Quantity is required'),
      }),
    ),
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          product: undefined,
          createdBy: currentUser.data._id,
          warehouse: warehouseId,
          store: undefined,
          warehousePrice: 0,
          storePrice: 0,
          sizes: [
            {
              id: Math.random(),
              size: 40,
              quantity: 1,
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={async (v) => {
          try {
            await createArticle(v)
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
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
          isValid,
        }) => (
          <Form noValidate autoComplete="off">
            <DialogTitle>Add a new article</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill in the article information.
              </DialogContentText>
              <Autocomplete
                onChange={(e, value: Product) => {
                  if (value) {
                    setFieldValue('product', value._id)
                  }
                }}
                disablePortal
                options={products.body.data}
                getOptionLabel={(option: Product) =>
                  `${option.name} (${option.sku})`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(touched.product && errors.product)}
                    fullWidth
                    helperText={
                      touched.product &&
                      errors.product &&
                      "Product field can't be empty"
                    }
                    label="Product"
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
                error={Boolean(touched.warehousePrice && errors.warehousePrice)}
                fullWidth
                helperText={
                  touched.warehousePrice &&
                  errors.warehousePrice &&
                  "Warehouse price field can't be empty"
                }
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
                error={Boolean(touched.storePrice && errors.storePrice)}
                fullWidth
                helperText={
                  touched.storePrice &&
                  errors.storePrice &&
                  "Store price field can't be empty"
                }
                label="Store price"
                type="number"
                margin="normal"
                name="storePrice"
                onBlur={handleBlur}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">AED</InputAdornment>
                  ),
                }}
                value={values.storePrice}
                variant="outlined"
              />
              <FieldArray name="sizes">
                {({ push, remove }) => (
                  <div>
                    {values.sizes.map((p, index) => {
                      const size = `sizes[${index}].size`
                      const touchedSize = getIn(touched, size)
                      const errorSize = getIn(errors, size)

                      const quantity = `sizes[${index}].quantity`
                      const touchedQuantity = getIn(touched, quantity)
                      const errorQuantity = getIn(errors, quantity)

                      return (
                        <Grid container spacing={2} key={p.id}>
                          <Grid item xs>
                            <TextField
                              type="number"
                              margin="normal"
                              variant="outlined"
                              label="Size (EU)"
                              name={size}
                              value={p.size}
                              required
                              helperText={
                                touchedSize && errorSize ? errorSize : ''
                              }
                              error={Boolean(touchedSize && errorSize)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs>
                            <TextField
                              type="number"
                              margin="normal"
                              variant="outlined"
                              label="Quantity"
                              name={quantity}
                              value={p.quantity}
                              required
                              helperText={
                                touchedQuantity && errorQuantity
                                  ? errorQuantity
                                  : ''
                              }
                              error={Boolean(touchedQuantity && errorQuantity)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs>
                            <Button
                              sx={{ marginTop: '20px' }}
                              type="button"
                              variant="outlined"
                              onClick={() => remove(index)}
                            >
                              x
                            </Button>
                          </Grid>
                        </Grid>
                      )
                    })}
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() =>
                        push({ id: Math.random(), size: 40, quantity: 1 })
                      }
                    >
                      Add different size
                    </Button>
                  </div>
                )}
              </FieldArray>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Create
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

AddArticleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  warehouseId: PropTypes.string.isRequired,
}

export default AddArticleModal
