import React from 'react';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FilterWrapperProps } from './filter.types';

const FilterWrapper: React.FC<FilterWrapperProps> = ({
  onClose,
  onSubmit,
  isValid = true,
  children
}) => {
  return (
    <Box>
      <form onSubmit={onSubmit}>
        {children}
        <Box display="flex" justifyContent="flex-end" mt={8} mb={2}>
          <Button type="button" color="inherit" size="large" onClick={onClose}>
            Close
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            disabled={!isValid}
            sx={{ ml: 2 }}
          >
            Apply
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default FilterWrapper;
