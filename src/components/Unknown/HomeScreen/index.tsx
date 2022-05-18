import {
  Typography,
  Box,
  IconButton,
  Toolbar,
  AppBar,
  Menu,
} from '@mui/material';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import firebase from 'firebase';
import { useUser } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import SimpleSnackbar from './Snackbar';

const HomeScreen: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSignOut = () => {
    try {
      firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    } finally {
      clearFirestoreCache();
    }
    setAnchorEl(null);
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: '#BDBDBD',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = useUser();
  const username = data.displayName || 'Unregister User';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SimpleSnackbar />
      <AppBar position="static" style={{ backgroundColor: '#F50057' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Voypost
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar {...stringAvatar(username)} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeScreen;
