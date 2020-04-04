import React from 'react';

import Loader from '@material-ui/core/CircularProgress';

import useStyles from './style';


// CircularProgress component
export default function CircularProgress(props) {
  const classes = useStyles();

  return (
    <div className={classes.spinnerWrapper}>
      <Loader
        {...props}
        disableShrink
      />
    </div>
  );
}
