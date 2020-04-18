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
// payload: answers
export const sendTestAnswers = createActionAsync(
  SUBMIT_ANSWERS, questionsServices.sendTestAnswers,
);


export const fetchQuestions = () => async dispatch => {
  dispatch(getTestQuestions());
};

export const submitAnswers = answers => async dispatch => {
  await dispatch(sendTestAnswers(answers));
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ANSWERS_ASYNC.PENDING:
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
          id: question.id,
          answer: null,
        })),
      };

    case SUBMIT_ANSWERS_ASYNC.SUCCESS:
      return {
        ...state,
        rightAnswers: action.payload,
      };

    case CHOOSE_ANSWER:
      return {
        ...state,
        answeredQuestions: state.answeredQuestions.map(chosenAnswer =>
          (
            chosenAnswer.id === action.payload.questionId
              ? {
                id: action.payload.questionId,
                answerId: action.payload.answer,
              }
              : chosenAnswer
          ),
        ),
      };

    default:
      return state;
  }
};
