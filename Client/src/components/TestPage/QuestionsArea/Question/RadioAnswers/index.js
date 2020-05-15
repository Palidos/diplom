import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
export default function RadioAnswers({ question, answers }) {
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const classes = useStyles({ pathname });
  const dispatch = useDispatch();

  const handleChange = e => {
    setChosenAnswer(e.target.value);
    dispatch(chooseAnswer(question._id, question.answers.indexOf(e.target.value)));
  };

  return (
    <>
      {
        pathname === 'results'
          ? (
            <div className={classes.answersGrid}>
              {
                question.answers.map((answer, index) => (
                  <Typography
                    key={answer}
                    className={classes.answer}
                  >
                    <img
                      src={answer}
                      alt='img'
                      style={{
                        backgroundColor: // use color only on a chosen answer or on a right answer
                        question.answers.indexOf(chosenAnswer) === index
                          ? answers.correct ? colors.correct : colors.wrong
                          : String(index) === rightAnswers.find(({ questionId }) =>
                            questionId === question._id).answers[0] ? colors.correct : 'transparent',
                      }}
                    />
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
                    label={(
                      <img
                        src={answer}
                        alt='img'
                      />
                    )}
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
