import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CircularProgress from 'components/CircularProgress';

import Paper from '@material-ui/core/Paper';

import Question from './Question';

import useStyles from './style';

// QuestionsArea component
export default function QuestionsArea() {
  const questions = useSelector(state => state.questions.questions);
  const isQuestionsLoaded = useSelector(state => state.questions.isQuestionsLoaded);
  const rightAnswers = useSelector(state => state.questions.rightAnswers);
  const statistics = useSelector(state => state.questions.statistics);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const classes = useStyles({ pathname });
  return (
    <>
      <Paper
        className={classes.questionsArea}
        elevation={3}
      >
        {pathname !== 'finalResults'
          ? isQuestionsLoaded
            ? questions
              .map((question, index) => (
                <Question
                  key={question._id}
                  question={question}
                  index={index}
                  answers={rightAnswers.find(({ questionId }) =>
                    questionId === question._id)}
                />
              ))
            : <CircularProgress />
          : (
            <div className={classes.statisticsWrapper}>
              <div className={classes.statisticsHeader}>
                <div>{`Theme`}</div>
                <div>{`Highest question level answered`}</div>
              </div>
              {statistics.map(stat => (
                <div className={classes.statisticsItem}>
                  <div className={classes.theme}>
                    {stat.theme}
                  </div>
                  <div className={classes.maxQuestionLevel}>
                    {
                      stat.maxQuestionLevel === null
                        ? 'No questions from that theme were answered correct'
                        : stat.maxQuestionLevel
                    }
                  </div>
                </div>
              ))}
            </div>
          ) }

      </Paper>
    </>
  );
}
