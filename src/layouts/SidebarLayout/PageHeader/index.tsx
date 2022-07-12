import {
  Typography,
  Grid,
  styled,
  experimental_sx as sx,
  Box,
  Button,
  Divider,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const SubTitleSvg = styled('svg')(
  sx({
    width: '0.6875rem',
    height: '1.125rem',
    ml: 3,
  }),
)

const SubTitleArrow = React.memo(() => (
  <SubTitleSvg viewBox="0 0 11 18">
    <polygon
      fill="#737480"
      fillRule="nonzero"
      stroke="none"
      points="2.09312 0 0 2.115 6.79892 9 0 15.885 2.09312 18 11 9"
    />
  </SubTitleSvg>
))

const PageHeader: React.FC<{
  title: string
  subTitle?: string | Array<string>
  canGoBack?: boolean
}> = ({ title, subTitle, canGoBack }) => {
  const navigate = useNavigate()

  const [width, setWidth] = useState<number>(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 1024
  const isTablet = width <= 740
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
          <Typography variant={!isTablet ? 'h2' : 'h4'}>{title}</Typography>
          {subTitle &&
            (typeof subTitle === 'string' ? (
              <>
                <SubTitleArrow />
                <Typography
                  variant={!isTablet ? 'h3' : 'h4'}
                  component="span"
                  color="textSecondary"
                  ml={3}
                >
                  {subTitle}
                </Typography>
              </>
            ) : (
              <>
                {subTitle.map((s) => (
                  <Box key={`page_header_${s}`}>
                    <SubTitleArrow />
                    <Typography
                      variant={!isTablet ? 'h3' : 'h4'}
                      component="span"
                      color="textSecondary"
                      ml={3}
                    >
                      {s}
                    </Typography>
                  </Box>
                ))}
              </>
            ))}
        </Box>
        {!isMobile && canGoBack && (
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={3}>
              {canGoBack && (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  )
}

PageHeader.propTypes = {
  subTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  canGoBack: PropTypes.bool,
}
PageHeader.defaultProps = {
  subTitle: undefined,
  canGoBack: false,
}

export default PageHeader
