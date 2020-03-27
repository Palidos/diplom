import React, { useRef } from 'react';

import DateBar from './components/DateBar';
import Layout from './components/Layout';
import LessonsFeed from './components/LessonsFeed';


// App component with all routing
export default function App() {
  const dateBarRef = useRef();
  return (
    <Layout>
      <DateBar
        dateBarRef={dateBarRef}
        gridWidth={3}
      />
      <LessonsFeed
        gridWidth={9}
        dateBarRef={dateBarRef}
      />
    </Layout>
  );
}
