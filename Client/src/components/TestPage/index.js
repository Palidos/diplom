import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchQuestions } from 'store/questionsStore';

import QuestionList from './QuestionList';
import QuestionsArea from './QuestionsArea';

import useStyles from './style';

// TestPage component
export default function TestPage() {
  const classes = useStyles();
  const testName = useSelector(state => state.questions.testName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions({
      collection: testName,
      settings: [{ questionLevel: 0 }],
    }));
  }, [dispatch, testName]);

  return (
    <div className={classes.testPageWrapper}>
      <QuestionList />
      <QuestionsArea />
    </div>
  );
}
