import { FormikValues } from 'formik';
import React from 'react';

export type FilterWrapperProps = {
  onClose: () => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isValid?: boolean;
};

export type FilterProps = {
  onClose: () => void;
  onFilterChange: (filter: FormikValues) => void;
  previousValues?: FormikValues;
};
