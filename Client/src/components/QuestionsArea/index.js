import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Question from './Question';

import useStyles from './style';


// QuestionsArea component
export default function QuestionsArea({ gridWidth }) {
  const classes = useStyles();
  const questions = useSelector(state => state.questions.questions);

  return (
    <Grid
      item
      xs={gridWidth}
    >
      <Paper
        className={classes.questionsArea}
        elevation={3}
      >
        {
          questions
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(question => (
              <Question
                key={question.id}
                question={question}
              />
            ))
        }
      </Paper>
    </Grid>
  );
}
