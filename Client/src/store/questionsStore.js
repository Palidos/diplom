// import { getTestQuestions } from 'services/api/testsServices';

import { createNotification } from './notificationsStore';
import { API_QUESTIONS } from 'services/api/endpoints';
// import {
//   getAsyncTypes,
//   createActionAsync,
// } from './helpers';

// Action Types
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

// const GET_QUESTIONS = 'GET_QUESTIONS';
// const GET_QUESTIONS_ASYNC = getAsyncTypes(GET_QUESTIONS);

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

// export const getQuestions = createActionAsync(GET_QUESTIONS, getTestQuestions);

// export const fetchQuestions = () => async dispatch => {
//   dispatch(getQuestions());
// };

// export const fetchQuestions = () => async (dispatch, getState) => {
//   try {
//     dispatch(requestQuestions());
//     dispatch(receiveQuestions(await getTestQuestions()));
//   } catch (error) {
//     dispatch(createNotification(error.message, getState().notifications.types.error));
//     console.error(error);
//   }
// };

export const fetchQuestions = () => async (dispatch,getState) => {
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
    // case GET_QUESTIONS_ASYNC.PENDING:
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isQuestionsLoaded: false,
      };

    // case GET_QUESTIONS_ASYNC.SUCCESS:
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
