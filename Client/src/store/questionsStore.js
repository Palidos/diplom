import * as questionsServices from '../services/api/questionsServices';
import {
  getAsyncTypes,
  createActionAsync,
} from './helpers';

// Action Types
const CHOOSE_ANSWER = 'CHOOSE_ANSWER';

const GET_QUESTIONS = 'GET_QUESTIONS';
const GET_QUESTIONS_ASYNC = getAsyncTypes(GET_QUESTIONS);


// Initial State
const initialState = {
  questions: [],
  isQuestionsLoaded: false,
  answeredQuestions: [],
};


// Actions (dispatchers)

export const chooseAnswer = (questionId, answer) => ({
  type: CHOOSE_ANSWER,
  payload: {
    questionId,
    answer,
  },
});

export const getTestQuestions = createActionAsync(
  GET_QUESTIONS, questionsServices.getTestQuestions,
);

export const fetchQuestions = () => async dispatch => {
  dispatch(getTestQuestions());
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
        answeredQuestions: action.payload.map(question => ({ [question.id]: null })),
      };

    case CHOOSE_ANSWER:
      return {
        ...state,
        answeredQuestions: state.answeredQuestions.map(chosenAnswer =>
          (Number(Object.keys(chosenAnswer)[0]) === action.payload.questionId
            ? { [action.payload.questionId]: action.payload.answer }
            : chosenAnswer),
        ),
      };

    default:
      return state;
  }
};
