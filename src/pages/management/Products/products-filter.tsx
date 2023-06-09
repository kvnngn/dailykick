import { MenuItem, Select, TextField } from '@mui/material'
import React, { useCallback } from 'react'
import {
  FilterGrid,
  FilterGridItem,
  FilterProps,
  FilterSelect,
  FilterWrapper,
} from 'src/components/filter'
import useFilterFormik from 'src/hooks/api/common/useFilterFormik'
import useArticleAutoComplete from 'src/hooks/api/management/article/query/useArticleAutoComplete'
import * as Yup from 'yup'

type ProductsFilterForm = {
  // brand: string
  sku: string
  // brandModel: string
}

const useProductsFilterForm = (): UseValidation<ProductsFilterForm> => ({
  initialValues: {
    // brand: '',
    sku: '',
    // brandModel: '',
  },
  validationSchema: Yup.object({
    // brands: Yup.string(),
    sku: Yup.string(),
    // brandModel: Yup.string(),
  }).defined(),
})

const ProductsFilter: React.FC<FilterProps> = ({
  onClose,
  onFilterChange,
  previousValues,
}) => {
  const { initialValues, validationSchema } = useProductsFilterForm()
  const { values, handleArrayChange, handleBlur, handleSubmit, handleChange } =
    useFilterFormik(
      {
        initialValues: previousValues || initialValues,
        validationSchema,
        onSubmit: (v) => {
          onFilterChange(v)
          onClose()
        },
      },
      {},
    )

  return (
    <FilterWrapper onClose={onClose} onSubmit={handleSubmit}>
      <FilterGrid>
        {/* <FilterGridItem label="Brand">
          <TextField
            name="brand"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </FilterGridItem>
        <FilterGridItem label="Model">
          <TextField
            name="brandModel"
            value={values.brandModel}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </FilterGridItem> */}
        <FilterGridItem label="SKU">
          <TextField
            name="sku"
            value={values.sku}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </FilterGridItem>
      </FilterGrid>
    </FilterWrapper>
  )
}

export default ProductsFilter
