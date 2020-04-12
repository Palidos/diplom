import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import sampleImage from 'assets/loginBackground.jpg';
import { chooseAnswer } from 'store/questionsStore';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';
// Question component
export default function Question({ question }) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  const handleChange = event => {
    setValue(event.target.value);
    dispatch(chooseAnswer(question.id, event.target.value));
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
      <RadioGroup
        aria-label='answers'
        name='answers'
        value={value}
        onChange={handleChange}
        className={classes.answersGrid}
      >
        <FormControlLabel
          value={question.answer1}
          control={<Radio />}
          label={question.answer1}
        />
        <FormControlLabel
          value={question.answer2}
          control={<Radio />}
          label={question.answer2}
        />
        <FormControlLabel
          value={question.answer3}
          control={<Radio />}
          label={question.answer3}
        />
        <FormControlLabel
          value={question.answer4}
          control={<Radio />}
          label={question.answer4}
        />
      </RadioGroup>
    </div>
  );
}
