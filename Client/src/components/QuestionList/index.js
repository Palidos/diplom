import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-scroll';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './style';

// QuestionList component
export default function QuestionList({
  gridWidth,
  dateBarRef,
}) {
  const classes = useStyles();
  const questions = useSelector(state => state.questions.questions);

  const goTo = id => {
    window.location.hash = id;
  };

  return (
    <Grid
      item
      xs={gridWidth}
    >
      <Paper
        ref={dateBarRef}
        className={classes.questionList}
      >
        {
          questions
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(question => (
              <Button
                onClick={() => goTo(`q${question.id}`)}
                variant='outlined'
                color='primary'
                className={classes.questionLink}
              >
                {question.id}
              </Button>
            ))
        }
      </Paper>
    </Grid>
  );
}
