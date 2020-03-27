import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Question from './Question';

import useStyles from './style';


// QuestionsArea component
export default function QuestionsArea({ gridWidth }) {
  const classes = useStyles();


  return (
    <Grid
      item
      xs={gridWidth}
    >
      <Paper
        className={classes.lessonFeed}
        elevation={3}
      >
        <Question />
      </Paper>
    </Grid>
  );
}
