import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { answerColor } from 'models';
import { chooseAnswer } from 'store/questionsStore';
import { colors } from 'theme';

import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';
// TextFieldAnswers component
export default function TextFieldAnswers({ question }) {
  const classes = useStyles();
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    setChosenAnswer(e.target.value);
  };
  const handleBlur = () => {
    dispatch(chooseAnswer(question.id, chosenAnswer === '' && null));
  };


  return (
    <>
      {
        pathname === 'results'
          ? (
            <>
              <Typography
                className={classes.answer}
                style={{
                  color:
                  answerColor(question.id, rightAnswers, chosenAnswer),
                }}
              >
                {`Ваш ответ: ${chosenAnswer}`}
              </Typography>
              {
                answerColor(question.id, rightAnswers, chosenAnswer) === colors.wrong && (
                  <Typography
                    className={classes.answer}
                  >
                    {`Правильный ответ: ${rightAnswers.find(({ questionId }) =>
                      questionId === question.id).answers[0]}`}
                  </Typography>
                )
              }
            </>
          )
          : (
            <div
              className={classes.textFieldWrapper}
            >
              <TextField
                variant='outlined'
                value={chosenAnswer}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classes.answer}
              />
            </div>
          )
      }
    </>
  );
}
