import React from 'react';

import QuestionList from './QuestionList';
import QuestionsArea from './QuestionsArea';


// TestPage component
export default function TestPage() {
  return (
    <>
      <QuestionList
        gridWidth={2}
      />
      <QuestionsArea
        gridWidth={7}
      />
    </>
  );
}
