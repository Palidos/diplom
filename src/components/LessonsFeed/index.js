import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import useStyles from './style';


// LessonsFeed component
export default function LessonsFeed({ gridWidth }) {
  const classes = useStyles();


  return (
    <Grid
      item
      xs={gridWidth}
    >
      <Paper
        className={classes.lessonFeed}
        elevation={3}
      />
    </Grid>
  );
}
