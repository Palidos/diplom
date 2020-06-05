import React from 'react';

import QuestionList from './QuestionList';
import QuestionsArea from './QuestionsArea';

import useStyles from './style';

// TestPage component
export default function TestPage() {
  const classes = useStyles();
  return (
    <div className={classes.testPageWrapper}>
      <QuestionList />
      <QuestionsArea />
    </div>
  );
}
