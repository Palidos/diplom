import React from 'react';

import Typography from '@material-ui/core/Typography';

import CheckBoxAnswers from './CheckBoxAnswers';
import RadioAnswers from './RadioAnswers';
import TextFieldAnswers from './TextFieldAnswers';

import useStyles from './style';

// Question component
export default function Question({
  question,
  index,
  answers,
}) {
  const classes = useStyles();

  const answerType = () => {
    switch (question.questionType) {
      case 0:
        return (
          <RadioAnswers
            question={question}
            answers={answers}
          />
        );
      case 1:
        return (
          <CheckBoxAnswers
            question={question}
            answers={answers}
          />
        );
      case 2:
        return (
          <TextFieldAnswers
            question={question}
            answers={answers}
          />
        );
      default:
        break;
    }
  };

  return (
    <div
      className={classes.questionWrapper}
      id={`q${question._id}`}
    >
      <Typography
        noWrap
        className={classes.questionNumber}
      >
        {`№${index + 1}.`}
      </Typography>
      <Typography
        className={classes.questionTitle}
      >
        {`${question.question}`}
      </Typography>
      {
        (question.src || question.mainContent) && (
          <div className={classes.questionImageContainer}>
            {question.src && (
              <img
                src={question.src}
                alt='img'
                className={classes.questionImage}
              />
            )}
            {question?.mainContent}
          </div>
        )
      }
      {answerType(question)}
    </div>
  );
}
