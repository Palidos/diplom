import React from 'react';

import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

export default function TestSheet() {
  const classes = useStyles();

  return (
    <>
      <Paper
        className={classes.testMainSheet}
        elevation={3}
      />
    </>
  );
}
