import React from 'react';

import { Popover } from '@material-ui/core';

import ChangeRole from './ChangeRole';
import Logout from './Logout';


// AccountMenu component
export default ({
  open, anchorEl, setOpen,
}) => {
  const handleClose = () => {
    setOpen(null);
  };

  return (
    <Popover
      id='menu-appbar'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <ChangeRole
        handleClose={handleClose}
      />
      <Logout
        handleClose={handleClose}
      />
    </Popover>
  );
};
