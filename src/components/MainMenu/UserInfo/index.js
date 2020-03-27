import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import AccountMenu from './AccountMenu';

import useStyles from './style';

// UserInfo component
export default function UserInfo() {
  const classes = useStyles();
  const firstName = useSelector(state => state.identity.firstName);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.userInfo}>
      <Typography className={classes.userName}>
        {firstName}
      </Typography>
      <IconButton
        className={classes.iconButton}
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        disableRipple
        size='small'
        onClick={handleMenu}
      >
        <AccountCircle className={classes.userAvatar} />
        <ExpandMoreRoundedIcon />
      </IconButton>
      <AccountMenu
        open={open}
        anchorEl={anchorEl}
        setOpen={setAnchorEl}
      />
    </div>
  );
}
