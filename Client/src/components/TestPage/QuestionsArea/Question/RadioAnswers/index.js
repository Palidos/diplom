import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { answerColor } from 'models';
import { chooseAnswer } from 'store/questionsStore';

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
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    setChosenAnswer(e.target.value);
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
                      color: // use color only on a chosen answer or on a right answer
                        (chosenAnswer === answer ||
                          rightAnswers.find(({ questionId }) =>
                            questionId === question.id).answers[0] === answer) &&
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
              value={chosenAnswer}
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
