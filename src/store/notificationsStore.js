// Action Types
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';
const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';


// Initial State
const initialState = {
  notification: {
    isOpen: false,
    message: '',
    type: null,
    isActive: false,
  },
  types: {
    error: 'error',
    success: 'success',
  },
};


// Actions (dispatchers)
export const createNotification = (message, type) => ({
  type: CREATE_NOTIFICATION,
  payload: {
    message,
    type,
  },
});

export const openNotification = () => ({ type: OPEN_NOTIFICATION });

export const closeNotification = () => ({ type: CLOSE_NOTIFICATION });


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          ...action.payload,
          isActive: true,
        },
      };

    case OPEN_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          isOpen: true,
        },
      };

    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          isOpen: false,
          isActive: false,
        },
      };

    default:
      return state;
  }
};
