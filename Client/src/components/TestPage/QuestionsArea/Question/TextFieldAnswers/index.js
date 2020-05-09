import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { answerColor } from 'models';
import { chooseAnswer } from 'store/questionsStore';
import { colors } from 'theme';

import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';
// TextFieldAnswers component
export default function TextFieldAnswers({ question, answers }) {
  const classes = useStyles();
  const [chosenAnswer, setChosenAnswer] = useState('');
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    setChosenAnswer(Number.isNaN(parseInt(e.target.value, 10)) ? e.target.value : e.target.value.replace(/\s/g, ''));
  };
  const handleBlur = () => {
    dispatch(chooseAnswer(question._id, chosenAnswer === '' ? null : chosenAnswer));
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
                  answerColor(question._id, answers, chosenAnswer),
                }}
              >
                {`Your answer: ${chosenAnswer} `}
              </Typography>
              {
                answerColor(question._id, answers, chosenAnswer) === colors.wrong && (
                  <div
                    className={classes.answer}
                  >
                    {`Right answer:`}
                    {answers.src && (
                      <img
                        src={answers.src}
                        alt='img'
                        className={classes.questionImage}
                      />
                    )}
                  </div>
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
