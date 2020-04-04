import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import useStyles from './style';


// QuestionList component
export default function QuestionList({
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
        className={classes.questionList}
      >
        <Button
          variant='outlined'
          color='primary'
          href='#question'
          className={classes.questionLink}
        >
          {'1'}
        </Button>
      </Paper>
    </Grid>
  );
}
