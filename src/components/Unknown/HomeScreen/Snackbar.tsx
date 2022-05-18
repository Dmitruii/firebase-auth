import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Typography } from '@mui/material';

function SimpleSnackbar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Typography
        style={{
          backgroundColor: '#323232',
          color: '#fff',
          padding: '14px',
          borderRadius: '4px',
        }}
      >
        Welcome on board 🚀
      </Typography>
    </Snackbar>
  );
}

export default SimpleSnackbar;
