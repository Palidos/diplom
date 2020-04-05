import { API_QUESTIONS } from 'services/api/endpoints';

import { createNotification } from './notificationsStore';


// Action Types
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const CHOOSE_ANSWER = 'CHOOSE_ANSWER';


// Initial State
const initialState = {
  questions: [],
  isQuestionsLoaded: false,
  answeredQuestions: [],
};


// Actions (dispatchers)
const requestQuestions = () => ({ type: REQUEST_QUESTIONS });

const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  payload: questions,
});

export const chooseAnswer = (questionId, answer) => ({
  type: CHOOSE_ANSWER,
  payload: {
    questionId,
    answer,
  },
});

export const fetchQuestions = () => async (dispatch, getState) => {
  try {
    dispatch(requestQuestions());
    const response = await fetch(API_QUESTIONS);
    if (response.ok) {
      const json = await response.json();
      dispatch(receiveQuestions(json));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, getState().notifications.types.error));
  }
};

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isQuestionsLoaded: false,
      };

    case RECEIVE_QUESTIONS:
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
