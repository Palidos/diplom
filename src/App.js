import React, { useRef } from 'react';

import Layout from './components/Layout';
import QuestionList from './components/QuestionList';
import QuestionsArea from './components/QuestionsArea';


// App component with all routing
export default function App() {
  const dateBarRef = useRef();
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
