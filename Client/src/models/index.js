import { colors } from 'theme';

export const backgroundColor = (qId, path, rightAnswers, answeredQuestions, isQuestionAnswered) => {
  if (path === 'results') {
    return rightAnswers.find(({ questionId }) =>
      questionId === qId).answers.some(answer => answer ===
        answeredQuestions.find(({ questionId }) =>
          questionId === qId).answer)
      ? colors.correct : colors.wrong;
  }
  return isQuestionAnswered(qId) && colors.answered;
};

export const answerColor = (qId, answers, clientAnswer) => {
  return answers.answers.some(answer => answer === clientAnswer)
    ? colors.correct : colors.wrong;
};
