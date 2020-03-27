// Action Types
const SET_DATE = 'SET_DATE';

// Initial State
const initialState = {};

// Action Creators

// Setting new date
export const setDate = date => ({
  type: SET_DATE,
  payload: date,
});


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };

    default:
      return state;
  }
};
