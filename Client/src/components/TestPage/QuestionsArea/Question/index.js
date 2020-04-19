import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import sampleImage from 'assets/loginBackground.jpg';
import { chooseAnswer } from 'store/questionsStore';
import { colors } from 'theme';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';
// Question component
export default function Question({ question }) {
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
    <div
      className={classes.questionWrapper}
      id={`q${question.id}`}
    >
      <Typography
        noWrap
        className={classes.questionTitle}
      >
        {`${question.id}. ${question.question}`}
      </Typography>
      <div className={classes.questionImageContainer}>
        <img
          src={sampleImage}
          alt='img'
          className={classes.questionImage}
        />
      </div>
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
    </div>
  );
}
