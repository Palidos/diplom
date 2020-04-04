import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { closeNotification, openNotification } from '../../store/notificationsStore';

import useStyles from './style';


// NotificationCard component
export default function NotificationCard() {
  const notification = useSelector(state => state.notifications.notification);
  const classes = useStyles({ type: notification.type });
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeNotification());
  };

  useEffect(() => {
    notification.isActive && notification.message && dispatch(openNotification());
  }, [
    dispatch,
    notification.isActive,
    notification.message,
    notification.type,
  ]);

  return (
    <Snackbar
      className={classes.notification}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={notification.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      ContentProps={{ 'aria-describedby': 'message-id' }}
      message={(
        <span id='message-id'>
          {notification.message}
        </span>
      )}
      action={[
        <IconButton
          key='close'
          aria-label='close'
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}
