import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './style';


// DateBar component
export default function DateBar({
  gridWidth,
  dateBarRef,
}) {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={gridWidth}
    >
      <Paper
        ref={dateBarRef}
        className={classes.calendarMini}
      />
    </Grid>
  );
}
