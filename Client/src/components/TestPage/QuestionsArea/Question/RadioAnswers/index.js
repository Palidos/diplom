import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { answerColor } from 'models';
import { chooseAnswer } from 'store/questionsStore';
import { colors } from 'theme';

import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

import useStyles from './style';
// RadioAnswers component
export default function RadioAnswers({ question }) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    setValue(e.target.value);
    dispatch(chooseAnswer(question.id, e.target.value));
  };

  return (
    <>
      {
        pathname === 'results'
          ? (
            <div
              className={classes.answersGrid}
            >
              {
                question.answers.map(answer => (
                  <Typography
                    key={answer}
                    className={classes.answer}
                    style={{
                      color:
                      answerColor(question.id, rightAnswers, answer),
                    }}
                  >
                    {answer}
                  </Typography>
                ))
              }
            </div>
          )
          : (
            <RadioGroup
              aria-label='answers'
              name='answers'
              value={value}
              onChange={handleChange}
              className={classes.answersGrid}
            >
              {
                question.answers.map(answer => (
                  <FormControlLabel
                    key={answer}
                    value={answer}
                    control={<Radio />}
                    label={answer}
                    className={classes.answer}
                  />
                ))
              }
            </RadioGroup>
          )
      }
    </>
  );
}
