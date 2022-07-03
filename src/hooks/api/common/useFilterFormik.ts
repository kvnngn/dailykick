import { useCallback } from 'react'
import _ from 'lodash'
import { useFormik } from 'formik'
import { FormikConfig, FormikValues } from 'formik/dist/types'

const hasKey = (
  key: string | number,
  item: AutoCompleteData,
): key is keyof typeof item => _.has(item, key)

export default <Values extends FormikValues = FormikValues>(
  config: FormikConfig<Values>,
  items: AutoCompleteData | undefined,
) => {
  const formik = useFormik(config)
  const handleArrayChange = useCallback(
    (key: string, v: string | string[]) => {
      if (typeof v !== 'string' && v.length) {
        if (v.includes(null)) {
          if (Object.keys(items)?.length && hasKey(key, items)) {
            if (formik.values[key].length === items[key].length) {
              formik.setFieldValue(key as string, [])
            } else {
              formik.setFieldValue(key as string, items[key])
            }
          }
        } else {
          formik.setFieldValue(key, v)
        }
      }
    },
    [formik.values, formik.setFieldValue, items],
  )
  return {
    ...formik,
    handleArrayChange,
  }
}
