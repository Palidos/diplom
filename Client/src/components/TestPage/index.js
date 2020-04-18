import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchQuestions } from 'store/questionsStore';

import QuestionList from './QuestionList';
import QuestionsArea from './QuestionsArea';


// TestPage component
export default function TestPage() {
  const dateBarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <>
      <QuestionList
        dateBarRef={dateBarRef}
        gridWidth={2}
      />
      <QuestionsArea
        gridWidth={7}
        dateBarRef={dateBarRef}
      />
    </>
  );
}
