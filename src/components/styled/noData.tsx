import React from 'react';
import { Box, Typography, TypographyProps } from '@mui/material';

type NoDataProps = Pick<TypographyProps, 'variant'> & {
  text?: string;
};

const NoAvailableDataComponent: React.FC<NoDataProps> = ({ variant, text }) => {
  return (
    <Typography variant={variant || 'subtitle2'} align="center">
      {text}
    </Typography>
  );
};
NoAvailableDataComponent.defaultProps = { text: undefined };
export const NoAvailableData = React.memo(NoAvailableDataComponent);

const NoAvailableDataCoverComponent: React.FC<NoDataProps> = ({
  variant,
  text
}) => (
  <Box
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      background: 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(4px)'
    }}
  >
    <NoAvailableData variant={variant} text={text} />
  </Box>
);
NoAvailableDataCoverComponent.defaultProps = { text: undefined };
export const NoAvailableDataCover = React.memo(NoAvailableDataCoverComponent);

export const ChartCoverBox: React.FC<NoDataProps & { isEmpty: boolean }> = ({
  children,
  isEmpty,
  variant,
  text
}) => (
  <Box position="relative" height="100%">
    {children}
    {isEmpty && <NoAvailableDataCover variant={variant} text={text} />}
  </Box>
);
ChartCoverBox.defaultProps = {
  text: undefined
};
