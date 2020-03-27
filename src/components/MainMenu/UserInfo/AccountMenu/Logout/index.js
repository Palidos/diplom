import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';

import { logout, stopImpersonating } from '../../../../../store/identityStore';


// Logout component
export default function Logout({ handleClose }) {
  const dispatch = useDispatch();
  const impersonate = useSelector(state => state.identity.impersonate);

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  const handleStopImpersonating = () => {
    dispatch(stopImpersonating());
  };

  return (
    <>
      {
        impersonate && (
          <MenuItem onClick={handleStopImpersonating}>
            {`Stop impersonation`}
          </MenuItem>
        )
      }
      <MenuItem onClick={handleLogout}>
        {`Log out`}
      </MenuItem>
    </>
  );
}
