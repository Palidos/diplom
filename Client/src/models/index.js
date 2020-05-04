import { colors } from 'theme';

export const backgroundColor = (qId, path, rightAnswers, answeredQuestions, isQuestionAnswered) => {
  if (path === 'results') {
    return rightAnswers.find(({ questionId }) =>
      questionId === qId).answers[0] ===
    answeredQuestions.find(({ questionId }) =>
      questionId === qId).answer
      ? colors.correct : colors.wrong;
  }
  return isQuestionAnswered(qId) && colors.answered;
};

export const answerColor = (qId, rightAnswers, clientAnswer) => {
  return rightAnswers.find(({ questionId }) =>
    questionId === qId).answers[0] === clientAnswer
    ? colors.correct : colors.wrong;
};
