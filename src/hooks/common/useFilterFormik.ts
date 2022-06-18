import { useCallback } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { FormikConfig, FormikValues } from 'formik/dist/types';

const hasKey = (
  key: string | number,
  item: AutoCompleteData,
): key is keyof typeof item => _.has(item, key);

export default <Values extends FormikValues = FormikValues>(
  config: FormikConfig<Values>,
  items: Array<AutoCompleteData> | ReadonlyArray<AutoCompleteData> | undefined,
) => {
  const formik = useFormik(config);
  const handleArrayChange = useCallback(
    (key: string, v: string | string[]) => {
      if (typeof v !== 'string' && v.length) {
        if (v.includes(null)) {
          if (items?.length && hasKey(key, items[0])) {
            if (formik.values[key].length === items[0][key].length) {
              formik.setFieldValue(key as string, []);
            } else {
              formik.setFieldValue(key as string, items[0][key]);
            }
          }
        } else {
          formik.setFieldValue(key, v);
        }
      }
    },
    [formik.values, formik.setFieldValue, items],
  );
  return {
    ...formik,
    handleArrayChange,
  };
};
