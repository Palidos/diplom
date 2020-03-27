import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';

// RoleMenuItem component
export default ({
  desiredRole, handleClose, handleClick,
}) => {
  return (
    <MenuItem
      onClick={() => {
        handleClose();
        handleClick(desiredRole);
      }}
    >
      {'To '}
      {desiredRole}
    </MenuItem>
  );
};
