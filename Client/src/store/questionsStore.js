import * as questionsServices from 'services/api/questionsServices';

import {
  getAsyncTypes,
  createActionAsync,
} from './helpers';

// Action Types
const CHOOSE_ANSWER = 'CHOOSE_ANSWER';

const GET_QUESTIONS = 'GET_QUESTIONS';
const GET_QUESTIONS_ASYNC = getAsyncTypes(GET_QUESTIONS);

const SUBMIT_ANSWERS = 'SUBMIT_ANSWERS';
const SUBMIT_ANSWERS_ASYNC = getAsyncTypes(SUBMIT_ANSWERS);


// Initial State
const initialState = {
  questions: [],
  isQuestionsLoaded: false,
  answeredQuestions: [],
  rightAnswers: [],
  submitLoaded: true,
};


// Actions (dispatchers)

export const chooseAnswer = (questionId, answer) => ({
  type: CHOOSE_ANSWER,
  payload: {
    questionId,
    answer,
  },
});

// payload: {}
export const getTestQuestions = createActionAsync(
  GET_QUESTIONS, questionsServices.getTestQuestions,
);
// payload: {testName, answers}
export const sendTestAnswers = createActionAsync(
  SUBMIT_ANSWERS, questionsServices.sendTestAnswers,
);


export const fetchQuestions = options => async dispatch => {
  dispatch(getTestQuestions(options));
};

export const submitAnswers = testNameAndAnswers => async dispatch => {
  await dispatch(sendTestAnswers(testNameAndAnswers));
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_ASYNC.PENDING:
      return {
        ...state,
        isQuestionsLoaded: false,
      };

    case GET_QUESTIONS_ASYNC.SUCCESS:
      return {
        ...state,
        questions: action.payload,
        isQuestionsLoaded: true,
        answeredQuestions: action.payload.map(question => ({
          questionId: question._id,
          answer: null,
        })),
      };

    case SUBMIT_ANSWERS_ASYNC.PENDING: return {
      ...state,
      submitLoaded: false,
    };

    case SUBMIT_ANSWERS_ASYNC.SUCCESS:
      return {
        ...state,
        rightAnswers: action.payload,
        isQuestionsLoaded: true,
        submitLoaded: true,
      };

    case CHOOSE_ANSWER:
      return {
        ...state,
        answeredQuestions: state.answeredQuestions.map(chosenAnswer =>
          (
            chosenAnswer.questionId === action.payload.questionId
              ? {
                questionId: action.payload.questionId,
                answer: action.payload.answer,
              }
              : chosenAnswer
          ),
        ),
      };

    default:
      return state;
  }
};
