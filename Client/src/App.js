import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from 'components/Layout';
import NewTestCreator from 'components/NewTestCreator';
import SelectionPage from 'components/SelectionPage';
import TestPage from 'components/TestPage';


// App component with all routing
export default function App() {
  return (
    <Layout>
      <Switch>
        <Route
          path='/main'
          component={SelectionPage}
        />
        <Route
          path='/edit/:testName?'
          component={NewTestCreator}
        />
        <Route
          path='/test/:testName?'
          component={TestPage}
        />
        <Route
          path='/results/:testName?'
          component={TestPage}
        />
        <Route
          path='/finalResults/:testName?'
          component={TestPage}
        />
      </Switch>
    </Layout>
  );
}
