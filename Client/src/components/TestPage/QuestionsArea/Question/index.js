import React from 'react';

import Typography from '@material-ui/core/Typography';

import CheckBoxAnswers from './CheckBoxAnswers';
import RadioAnswers from './RadioAnswers';
import TextFieldAnswers from './TextFieldAnswers';

import useStyles from './style';
// Question component
export default function Question({ question }) {
  const classes = useStyles();

  const answerType = () => {
    switch (question.questionType) {
      case 0:
        return <RadioAnswers question={question} />;
      case 1:
        return <CheckBoxAnswers question={question} />;
      case 2:
        return <TextFieldAnswers question={question} />;
      default:
        break;
    }
  };

  return (
    <div
      className={classes.questionWrapper}
      id={`q${question.id}`}
    >
      <Typography
        noWrap
        className={classes.questionNumber}
      >
        {`№${question.id + 1}.`}
      </Typography>
      <Typography
        className={classes.questionTitle}
      >
        {`${question.question}`}
      </Typography>
      <div className={classes.questionImageContainer}>
        {
          question.src && (
            <img
              src={question.src}
              alt='img'
              className={classes.questionImage}
            />
          )
        }
      </div>
      {answerType(question)}
    </div>
  );
}
