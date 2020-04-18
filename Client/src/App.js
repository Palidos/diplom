import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import Layout from 'components/Layout';
import ResultPage from 'components/ResultPage';
import TestPage from 'components/TestPage';
import { fetchQuestions } from 'store/questionsStore';


// App component with all routing
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Layout>
      <Route
        path='/test'
        component={TestPage}
      />
      <Route
        path='/results'
        component={ResultPage}
      />
    </Layout>
  );
}
