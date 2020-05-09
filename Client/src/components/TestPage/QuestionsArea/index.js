import React from 'react';
import { useSelector } from 'react-redux';

import CircularProgress from 'components/CircularProgress';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Question from './Question';

import useStyles from './style';

// QuestionsArea component
export default function QuestionsArea({ gridWidth }) {
  const classes = useStyles();
  const questions = useSelector(state => state.questions.questions);
  const isQuestionsLoaded = useSelector(state => state.questions.isQuestionsLoaded);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);

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
          isQuestionsLoaded
            ? questions
              .map((question, index) => (
                <Question
                  key={question._id}
                  question={question}
                  index={index}
                  answers={rightAnswers.find(({ questionId }) =>
                    questionId === question._id)}
                />
              ))
            : <CircularProgress />
        }
      </Paper>
    </Grid>
  );
}
