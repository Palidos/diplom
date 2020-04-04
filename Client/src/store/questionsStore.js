import { getTestQuestions } from 'services/api/testsServices';

import { createNotification } from './notificationsStore';

// Action Types
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';


// Initial State
const initialState = {
  questions: [],
  isQuestionsLoaded: false,
};


// Actions (dispatchers)
const requestQuestions = () => ({ type: REQUEST_QUESTIONS });


const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  payload: questions,
});

export const fetchQuestions = () => async (dispatch, getState) => {
  try {
    dispatch(requestQuestions());
    dispatch(receiveQuestions(await getTestQuestions()));
  } catch (error) {
    dispatch(createNotification(error.message, getState().notifications.types.error));
    console.error(error);
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
      };

    default:
      return state;
  }
};
