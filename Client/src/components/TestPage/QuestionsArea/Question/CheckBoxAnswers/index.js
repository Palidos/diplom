import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { chooseAnswer } from 'store/questionsStore';
import { colors } from 'theme';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import useStyles from './style';
// CheckBoxAnswers component
export default function CheckBoxAnswers({ question }) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const answeredQuestions = useSelector(state => state.questions.answeredQuestions);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    setValue(e.target.value);
    dispatch(chooseAnswer(question.id, question.answers.indexOf(e.target.value)));
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
                question.answers.map((answer, index) => (
                  <Typography
                    key={answer}
                    className={classes.answer}
                    style={{
                      color: rightAnswers.find(({ id }) =>
                        id === question.id).correctAnswerId === index
                        ? colors.correct
                        : answeredQuestions.find(({ id }) => id === question.id)
                          .answerId === index && colors.wrong,
                    }}
                  >
                    {answer}
                  </Typography>
                ))
              }
            </div>
          )
          : (
            <FormControl
              component='fieldset'
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
                    labelPlacement='end'
                    control={<Checkbox color='primary' />}
                    label={answer}
                    className={classes.answer}
                  />
                ))
              }
            </FormControl>
          )
      }
    </>
  );
}
