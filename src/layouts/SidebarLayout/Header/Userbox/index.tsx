import { useCallback, useEffect, useRef, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { GLOBAL } from 'src/constants';
import { ROUTES } from 'src/routes';
import { useCurrentInfo } from 'src/hooks/api/common';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const { currentUser, currentRole } = useCurrentInfo();
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const signOut = useCallback(() => {
    localStorage.removeItem(GLOBAL.ACCESS_TOKEN);
    localStorage.removeItem(GLOBAL.REFRESH_TOKEN);
    localStorage.removeItem(GLOBAL.REFRESH_TOKEN_EXPIRED);
    navigate(ROUTES.AUTH.SIGNIN);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      signOut();
    }
  }, [currentUser]);

  return (
    <>
      {currentUser && (
        <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
          <Avatar
            variant="rounded"
            alt={currentUser.firstname}
            src={currentUser.avatar}
          />
          <Hidden mdDown>
            <UserBoxText>
              <UserBoxLabel variant="body1">
                {currentUser.firstname}
              </UserBoxLabel>
              <UserBoxDescription variant="body2">
                {currentRole}
              </UserBoxDescription>
            </UserBoxText>
          </Hidden>
          <Hidden smDown>
            <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
          </Hidden>
        </UserBoxButton>
      )}
      {currentUser && (
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <Avatar
              variant="rounded"
              alt={currentUser.firstname}
              src={currentUser.avatar}
            />
            <UserBoxText>
              <UserBoxLabel variant="body1">
                {currentUser.firstname}
              </UserBoxLabel>
              <UserBoxDescription variant="body2">
                {currentRole}
              </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>
          <Divider sx={{ mb: 0 }} />
          <List sx={{ p: 1 }} component="nav">
            <ListItem button to={ROUTES.PROFILE.SETTINGS} component={NavLink}>
              <AccountTreeTwoToneIcon fontSize="small" />
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
          <Divider />
          <Box sx={{ m: 1 }}>
            <Button color="primary" fullWidth onClick={signOut}>
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Log out
            </Button>
          </Box>
        </Popover>
      )}
    </>
  );
}

export default HeaderUserbox;
