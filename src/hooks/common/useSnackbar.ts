import { SnackbarOrigin, useSnackbar as snackbarHook } from 'notistack';
import { useCallback } from 'react';

const AUTO_HIDE_DURATION = 5000 as const;

const useSnackbar = () => {
  const { enqueueSnackbar } = snackbarHook();

  const showSnackbar = useCallback(
    (
      message = '',
      variant: 'default' | 'error' | 'success' | 'warning' | 'info' = 'default',
      anchorOrigin?: SnackbarOrigin,
    ) => {
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: AUTO_HIDE_DURATION,
        anchorOrigin,
        style: {
          whiteSpace: 'pre-line',
        },
      });
    },
    [enqueueSnackbar],
  );

  const showSuccessSnackbar = useCallback(
    (message = '', anchorOrigin?: SnackbarOrigin) => {
      showSnackbar(message, 'success', anchorOrigin);
    },
    [showSnackbar],
  );

  const showInfoSnackbar = useCallback(
    (message = '', anchorOrigin?: SnackbarOrigin) => {
      showSnackbar(message, 'info', anchorOrigin);
    },
    [showSnackbar],
  );

  const showErrorSnackbar = useCallback(
    (message = '', anchorOrigin?: SnackbarOrigin) => {
      showSnackbar(message, 'error', anchorOrigin);
    },
    [showSnackbar],
  );

  return {
    showSnackbar,
    showSuccessSnackbar,
    showInfoSnackbar,
    showErrorSnackbar,
  };
};

export default useSnackbar;
