import {
  API_IDENTITY, API_IDENTITY_LOGOUT, API_IMPERSONATE,
} from '../services/api/endpoints';

// Action Types
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const ROLE_SAVE = 'ROLE_SAVE';
const SET_IMPERSONATING_STATUS = 'SET_IMPERSONATING_STATUS';


// Initial State
const initialState = {
  success: false,
  resultCode: null,
  resultTitle: '',
  isLoading: false,
  roles: null,
  role: null,
  isLogged: false,
  username: null,
  impersonate: false,
};


// Actions (dispatchers)
const requestLogin = () => ({ type: LOGIN_REQUEST });

const receiveLoginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const receiveLoginFailure = () => ({ type: LOGIN_FAILURE });

const doLogout = () => ({ type: LOGOUT });

const saveRole = role => ({
  type: ROLE_SAVE,
  payload: role,
});

export const setImpersonatingStatus = status => ({
  type: SET_IMPERSONATING_STATUS,
  payload: status,
});


// Complex Action Creators

// Sending login request to API
export const login = () => async dispatch => {
  dispatch(requestLogin());

  try {
    const response = await fetch(API_IDENTITY);

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveLoginSuccess(json));
    }
  } catch (error) {
    dispatch(receiveLoginFailure());
    console.log('Error', error);
  }
};


// Logging out
export const logout = () => async dispatch => {
  try {
    const response = await fetch(API_IDENTITY_LOGOUT);

    if (response.status === 200) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    console.log('Error', error);
  }

  dispatch(doLogout());
};

// Start impersonating
export const startImpersonating = body => async () => {
  try {
    const response = await fetch(API_IMPERSONATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      document.location.reload();
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Stop impersonating
export const stopImpersonating = () => async () => {
  try {
    const response = await fetch(API_IMPERSONATE, { method: 'DELETE' });

    if (response.ok) {
      document.location.reload();
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Updating role
export const updateRole = newRole => dispatch => {
  dispatch(saveRole(newRole));
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        resultCode: null,
        resultTitle: '',
        isLogged: true,
        ...action.payload,
        // If lastRole from localStorage is valid - sets it OR sets last role from backend
        role: action.payload.roles.includes(localStorage.getItem('lastRole'))
          ? localStorage.getItem('lastRole')
          : action.payload.roles[action.payload.roles.length - 1],
      };

    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        success: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        isLogged: false,
      };

    case ROLE_SAVE:
      return {
        ...state,
        role: action.payload,
      };

    case SET_IMPERSONATING_STATUS:
      return {
        ...state,
        impersonate: action.payload,
      };

    default:
      return state;
  }
};
