import React, { Suspense } from 'react';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import {
  Box,
  BoxProps,
  CircularProgress,
  IconButton,
  Paper,
  PaperProps,
  Typography,
  TypographyProps
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

type ErrorTextProp = {
  errorText?: string;
};

const ErrorBoundaryText: React.FC<
  Omit<TypographyProps, 'variant' | 'color'> & ErrorTextProp
> = ({ errorText, ...props }) => {
  return (
    <Typography variant="subtitle2" color="textSecondary" {...props}>
      {errorText}
    </Typography>
  );
};
ErrorBoundaryText.defaultProps = {
  errorText: undefined
};

const ErrorBoundaryFallback =
  (errorText?: string): React.FC<FallbackProps> =>
  ({ resetErrorBoundary }) =>
    (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        p={10}
      >
        <ErrorBoundaryText errorText={errorText} mb={1} />
        <IconButton
          aria-label="Retry"
          size="large"
          onClick={() => resetErrorBoundary()}
        >
          <RefreshIcon fontSize="inherit" />
        </IconButton>
      </Box>
    );

const SuspenseFallback = React.memo(() => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100%"
    p={10}
  >
    <CircularProgress size={64} />
  </Box>
));

export const SuspensePaper: React.FC<PaperProps & ErrorTextProp> = ({
  children,
  errorText,
  ...props
}) => (
  <Paper square {...props}>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={ErrorBoundaryFallback(errorText)}
        >
          <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </Paper>
);
SuspensePaper.defaultProps = {
  errorText: undefined
};

export const SuspenseBox: React.FC<BoxProps & ErrorTextProp> = ({
  children,
  errorText,
  ...props
}) => (
  <Box {...props}>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={ErrorBoundaryFallback(errorText)}
        >
          <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </Box>
);
SuspenseBox.defaultProps = {
  errorText: undefined
};
