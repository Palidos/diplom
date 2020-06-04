import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { chooseAnswer } from 'store/questionsStore';
import { colors } from 'theme';

import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

// TextFieldAnswers component
export default function TextFieldAnswers({ question, answers }) {
  const [chosenAnswer, setChosenAnswer] = useState('');
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const classes = useStyles({ pathname });
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
                style={{ color: answers?.correct ? colors.correct : colors.wrong }}
              >
                {`Your answer: ${chosenAnswer} `}
              </Typography>
              {
                !answers?.correct && (
                  <div className={classes.answer}>
                    {`Right answer: `}
                    {answers?.src ? (
                      <img
                        src={answers.src}
                        alt='img'
                        className={classes.answerImage}
                      />
                    ) : (answers?.answers[0])}
                  </div>
                )
              }
            </>
          )
          : (
            <div className={classes.textFieldWrapper}>
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
