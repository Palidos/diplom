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
          path='/newTest/:testName?'
          component={NewTestCreator}
        />
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
