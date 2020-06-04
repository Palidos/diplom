import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Layout from 'components/Layout';
import SelectionPage from 'components/SelectionPage';
import TestPage from 'components/TestPage';
import { fetchQuestions } from 'store/questionsStore';

// App component with all routing
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions([{ questionLevel: 0 }]));
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        {/* <Route
          path='/main'
          component={SelectionPage}
        /> */}
        <Route
          path='/test'
          component={TestPage}
        />
        <Route
          path='/results'
          component={TestPage}
        />
      </Switch>
    </Layout>
  );
}
