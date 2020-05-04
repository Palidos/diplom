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
  const [value, setValue] = useState(null);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleBlur = () => {
    dispatch(chooseAnswer(question.id, value));
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
                  answerColor(question.id, rightAnswers, value),
                }}
              >
                {`Ваш ответ: ${value}`}
              </Typography>
              {
                answerColor(question.id, rightAnswers, value) === colors.wrong && (
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
            <TextField
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.answer}
            />
          )
      }
    </>
  );
}
