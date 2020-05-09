import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavHashLink as Link } from 'react-router-hash-link';

import CircularProgress from 'components/CircularProgress';
import { backgroundColor } from 'models';
import { submitAnswers } from 'store/questionsStore';

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
  const questions = useSelector(state => state.questions.questions);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const isQuestionsLoaded = useSelector(state => state.questions.isQuestionsLoaded);
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const classes = useStyles({ isQuestionsLoaded });
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];

  const isQuestionAnswered = questionId => {
    return answeredQuestions.find(chosenAnswer =>
      chosenAnswer.questionId === questionId).answer !== null;
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
                .map((question, index) => (
                  <div
                    className={classes.questionButtonWrapper}
                    key={question._id}
                  >
                    <Link
                      to={pathname === 'results' ? `/results/#q${question._id}` : `/test/#q${question._id}`}
                      smooth
                      offset={50}
                      duration={500}
                      className={classes.questionLink}
                    >
                      <Button
                        variant='outlined'
                        color='primary'
                        className={classes.questionButton}
                        style={{
                          backgroundColor:
                          // eslint-disable-next-line max-len
                          backgroundColor(question._id, pathname, rightAnswers, answeredQuestions, isQuestionAnswered),
                        }}
                      >
                        {index + 1}
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
