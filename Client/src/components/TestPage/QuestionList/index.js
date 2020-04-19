import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavHashLink as Link } from 'react-router-hash-link';

import CircularProgress from 'components/CircularProgress';
import { submitAnswers } from 'store/questionsStore';
import { colors } from 'theme';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Paper,
} from '@material-ui/core';

import useStyles from './style';

// QuestionList component
export default function QuestionList({ gridWidth }) {
  const classes = useStyles();
  const questions = useSelector(state => state.questions.questions);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const isQuestionsLoaded = useSelector(state => state.questions.isQuestionsLoaded);
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];

  const isQuestionAnswered = id => {
    return answeredQuestions.find(chosenAnswer =>
      chosenAnswer.id === id).answerId !== null;
  };

  const bgColor = qId => {
    if (pathname === 'results') {
      return rightAnswers.find(({ id }) =>
        id === qId).correctAnswerId === answeredQuestions.find(({ id }) => id === qId).answerId
        ? colors.correct : colors.wrong;
    }
    return isQuestionAnswered(qId) && colors.answered;
  };

  const handleOpenSubmitDialog = () => {
    setIsSubmitDialogOpen(true);
  };

  const handleCloseSubmitDialog = async e => {
    setIsSubmitDialogOpen(false);
    if (e.currentTarget.name === 'submit') {
      await dispatch(submitAnswers(answeredQuestions));
      history.push(`/results`);
    }
  };

  useEffect(() => {
    setIsDisabled(answeredQuestions.some(chosenAnswer =>
      chosenAnswer.answer === null));
  }, [answeredQuestions]);

  return (
    <>
      <Grid
        item
        xs={gridWidth}
      >
        <Paper
          className={classes.questionList}
        >
          {
            isQuestionsLoaded
              ? questions
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map(question => (
                  <div
                    className={classes.questionButtonWrapper}
                    key={question.id}
                  >
                    <Link
                      to={pathname === 'results' ? `/results/#q${question.id}` : `/test/#q${question.id}`}
                      smooth
                      offset={50}
                      duration={500}
                      className={classes.questionLink}
                    >
                      <Button
                        variant='outlined'
                        color='primary'
                        className={classes.questionButton}
                        style={{ backgroundColor: bgColor(question.id) }}
                      >
                        {question.id}
                      </Button>
                    </Link>
                  </div>
                ))
              : <CircularProgress />
          }
        </Paper>
        {
          pathname === 'test' && (
            <Button
              color='primary'
              variant='contained'
              className={classes.submitButton}
              onClick={handleOpenSubmitDialog}
            >
              {'Submit'}
            </Button>
          )
        }
      </Grid>

      <Dialog
        open={isSubmitDialogOpen}
        onClose={handleCloseSubmitDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Submit results?`}</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCloseSubmitDialog}
            color='primary'
          >
            {`Cancel`}
          </Button>
          <Button
            onClick={handleCloseSubmitDialog}
            name='submit'
            color='primary'
            autoFocus
          >
            {`Submit`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
