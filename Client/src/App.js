import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchQuestions } from 'store/questionsStore';

import Layout from './components/Layout';
import QuestionList from './components/QuestionList';
import QuestionsArea from './components/QuestionsArea';


// App component with all routing
export default function App() {
  const dateBarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Layout>
      <QuestionList
        dateBarRef={dateBarRef}
        gridWidth={2}
      />
      <QuestionsArea
        gridWidth={8}
        dateBarRef={dateBarRef}
      />
    </Layout>
  );
}
