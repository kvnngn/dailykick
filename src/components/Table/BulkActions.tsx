import { useState, useRef } from 'react';

import {
  Box,
  Menu,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions() {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Actions:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
          >
            Supprimer
          </ButtonError>
        </Box>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
