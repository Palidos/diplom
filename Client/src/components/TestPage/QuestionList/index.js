import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavHashLink as Link } from 'react-router-hash-link';

import CircularProgress from 'components/CircularProgress';
import { submitAnswers, fetchQuestions } from 'store/questionsStore';
import { colors } from 'theme';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Paper,
} from '@material-ui/core';

import useStyles from './style';

// QuestionList component
export default function QuestionList() {
  const questions = useSelector(state => state.questions.questions);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const isQuestionsLoaded = useSelector(state => state.questions.isQuestionsLoaded);
  const submitLoaded = useSelector(state => state.questions.submitLoaded);
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);
  const testName = useSelector(state => state.questions.testName);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const classes = useStyles({ isQuestionsLoaded });
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];


  const isQuestionAnswered = questionId => {
    return answeredQuestions.find(chosenAnswer =>
      chosenAnswer.questionId === questionId).answer !== null;
  };

  const backgroundColor = qId => {
    if (pathname === 'results') {
      return rightAnswers.find(({ questionId }) =>
        questionId === qId)?.correct
        ? colors.correct : colors.wrong;
    }
    return isQuestionAnswered(qId) && colors.answered;
  };

  const handleOpenSubmitDialog = () => {
    setIsSubmitDialogOpen(true);
  };

  const handleNextTest = () => {
    dispatch(fetchQuestions({
      settings: rightAnswers.map(option => ({
        testName,
        theme: option.theme,
        questionLevel: option.correct ? option.questionLevel + 1 : option.questionLevel - 1,
      })),
    }));
    history.push(`/test/${testName}`);
  };

  const handleStopTest = () => {
    history.push(`/finalResults/${testName}`);
  };

  const handleCloseSubmitDialog = async e => {
    setIsSubmitDialogOpen(false);
    if (e.currentTarget.name === 'submit') {
      await dispatch(submitAnswers({ answers: answeredQuestions }));
      history.push(`/results/${testName}`);
    }
  };

  useEffect(() => {
    setIsDisabled(answeredQuestions.some(chosenAnswer =>
      chosenAnswer.answer === null));
  }, [answeredQuestions]);

  return (
    <>
      <div style={{ width: 280 }}>
        <Paper
          className={classes.questionList}
          elevation={3}
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
                      to={`${testName}/#q${question._id}`}
                      smooth
                      offset={50}
                      duration={500}
                      className={classes.questionLink}
                    >
                      <Button
                        variant='outlined'
                        color='primary'
                        className={classes.questionButton}
                        style={{ backgroundColor: backgroundColor(question._id) }}
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
          pathname === 'test' ? (
            submitLoaded && (
              <Button
                color='primary'
                variant='contained'
                className={classes.submitButton}
                onClick={handleOpenSubmitDialog}
                // disabled={isDisabled}
              >
                {'Submit'}
              </Button>
            )
          ) : (
            <>
              <Button
                color='primary'
                variant='contained'
                className={classes.submitButton}
                onClick={handleNextTest}
              >
                {'Proceed to the next test'}
              </Button>
              <Button
                variant='contained'
                className={classes.stopButton}
                onClick={handleStopTest}
              >
                {'Stop'}
              </Button>
            </>
          )
        }
      </div>

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
