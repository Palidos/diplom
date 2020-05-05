import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { answerColor } from 'models';
import { chooseAnswer } from 'store/questionsStore';

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
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  const handleChange = e => {
    if (e.target.checked) {
      setChosenAnswers([...chosenAnswers, e.target.value]);
      dispatch(chooseAnswer(question.id, [...chosenAnswers, e.target.value]));
    } else {
      setChosenAnswers(chosenAnswers.filter(answer => answer !== e.target.value));
      dispatch(chooseAnswer(
        question.id, chosenAnswers.filter(answer => answer !== e.target.value),
      ));
    }
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
                      color: // use color only on a chosen answer or on a right answer
                        (chosenAnswers[index] === answer ||
                          rightAnswers.find(({ questionId }) =>
                            questionId === question.id).answers[index] === answer) &&
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
            <FormControl
              aria-label='answers'
              name='answers'
              value={chosenAnswers}
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
