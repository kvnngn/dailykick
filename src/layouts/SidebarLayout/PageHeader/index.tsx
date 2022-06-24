import {
  Typography,
  Grid,
  styled,
  experimental_sx as sx,
  Box,
  Button,
  Divider,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import React from 'react';

const SubTitleSvg = styled('svg')(
  sx({
    width: '0.6875rem',
    height: '1.125rem',
    ml: 3
  })
);

const SubTitleArrow = React.memo(() => (
  <SubTitleSvg viewBox="0 0 11 18">
    <polygon
      fill="#737480"
      fillRule="nonzero"
      stroke="none"
      points="2.09312 0 0 2.115 6.79892 9 0 15.885 2.09312 18 11 9"
    />
  </SubTitleSvg>
));

const SubTitleItem = React.memo(({ label }: { label: string }) => (
  <>
    <SubTitleArrow />
    <Typography variant="h3" component="span" color="textSecondary" ml={3}>
      {label}
    </Typography>
  </>
));

const PageHeader: React.FC<{
  title: string;
  subTitle?: string | Array<string>;
  canGoBack?: boolean;
}> = ({ title, subTitle, canGoBack }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ md: 'row', xs: 'column' }}
        justifyContent={{ md: 'space-between', xs: 'flex-start' }}
        alignItems={{ md: 'center', xs: 'flex-start' }}
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h2" sx={{ ml: 3 }}>
            {title}
          </Typography>
          {subTitle &&
            (typeof subTitle === 'string' ? (
              <SubTitleItem label={subTitle} />
            ) : (
              <>
                {subTitle.map((s) => (
                  <SubTitleItem key={`page_header_${s}`} label={s} />
                ))}
              </>
            ))}
        </Box>
        {canGoBack && (
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={3}>
              {canGoBack && (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  Retour
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

PageHeader.propTypes = {
  subTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  canGoBack: PropTypes.bool
};
PageHeader.defaultProps = {
  subTitle: undefined,
  canGoBack: false
};

export default PageHeader;
