import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavHashLink as Link } from 'react-router-hash-link';

import { chooseAnswer } from 'store/questionsStore';

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
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);

  const isQuestionAnswered = id => {
    answeredQuestions.map(chosenAnswer =>
      (Number(Object.keys(chosenAnswer)[0]) === id &&
    chooseAnswer[id] !== null));
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
              <div
                className={classes.questionButtonWrapper}
                key={question.id}
              >
                <Link
                  to={`/#q${question.id}`}
                  smooth
                  offset={50}
                  duration={500}
                  className={classes.questionLink}
                >
                  <Button
                    variant='outlined'
                    color='primary'
                    className={classes.questionButton}
                    style={{ backgroundColor: isQuestionAnswered(question.id) ? '#00ff00' : '#ff0000' }}
                  >
                    {question.id}
                  </Button>
                </Link>
              </div>
            ))
        }
      </Paper>
    </Grid>
  );
}
