import { store } from '..';
import {
  API_USERS,
  API_USERS_ID,
  API_GROUPS_ID_USERS,
  API_CLASSES_ID_USERS,
  API_CLASSES_ID_USERS_ID,
  API_USERS_ID_ROLES,
} from '../services/api/endpoints';
import * as usersService from '../services/api/users';
import {
  getAsyncTypes,
  // createAction,
  createActionAsync,
} from './helpers';
import { createNotification } from './notificationsStore';

// Action Types
const REQUEST_USERS = 'REQUEST_USERS';
const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
const REQUEST_CURRENT_USERS = 'REQUEST_CURRENT_USERS';
const RECEIVE_CURRENT_USERS = 'RECEIVE_CURRENT_USERS';
const RECEIVE_USERS_IN_GROUPS = 'RECEIVE_USERS_IN_GROUPS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const DELETE_CURRENT_USER = 'DELETE_CURRENT_USER';
const CHANGE_GROUP = 'CHANGE_GROUP';
const SET_ACTIVE = 'SET_ACTIVE';
const ADD_TEMP_USER_TO_GROUP = 'ADD_TEMP_USER_TO_GROUP';
const CLEAR_CURRENT_GROUP = 'CLEAR_CURRENT_GROUP';
const SET_CURRENT_USERS_LOADED = 'SET_CURRENT_USERS_LOADED';
const UPDATE_USER_ROLES = 'UPDATE_USER_ROLES';
const UPDATE_CURRENT_USER_ROLES = 'UPDATE_CURRENT_USER_ROLES';

const GET_USER_PROFILE = 'GET_USER_PROFILE';
const GET_USER_PROFILE_ASYNC = getAsyncTypes(GET_USER_PROFILE);


// Initial State
const initialState = {
  users: [],
  currentUsers: [],
  usersInGroups: [],
  activeUserId: null,
  isUsersLoaded: false,
  isCurrentUsersLoaded: false,
};


// Actions (dispatchers)
const requestUsers = () => ({ type: REQUEST_USERS });

const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  payload: users,
});

const receiveCurrentUsers = users => ({
  type: RECEIVE_CURRENT_USERS,
  payload: users,
});

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
});

export const deleteCurrentUser = adName => ({
  type: DELETE_CURRENT_USER,
  payload: adName,
});

const addUser = user => ({
  type: ADD_USER,
  payload: {
    ...user,
    onVacation: false,
    fullName: `${user.lastName} ${user.firstName}`,
  },
});

export const changeGroup = (id, groupId) => ({
  type: CHANGE_GROUP,
  payload: {
    id,
    groupId,
  },
});

export const setActive = id => ({
  type: SET_ACTIVE,
  payload: id,
});

export const addTempUserToGroup = user => ({
  type: ADD_TEMP_USER_TO_GROUP,
  payload: user,
});

export const clearCurrentGroup = () => ({ type: CLEAR_CURRENT_GROUP });

export const receiveUsersInGroups = usersInGroups => ({
  type: RECEIVE_USERS_IN_GROUPS,
  payload: usersInGroups,
});

export const setCurrentUsersLoaded = bool => ({
  type: SET_CURRENT_USERS_LOADED,
  payload: bool,
});

const updateUserRoles = newUser => ({
  type: UPDATE_USER_ROLES,
  payload: newUser,
});

export const updateCurrentUserRoles = (adName, roles) => ({
  type: UPDATE_CURRENT_USER_ROLES,
  payload: {
    adName,
    roles,
  },
});


// Complex Action Creators

export const getUserProfile = createActionAsync(GET_USER_PROFILE, usersService.getUserProfile);

// Fetching groups from API
export const fetchUsers = () => async dispatch => {
  try {
    dispatch(requestUsers());

    const response = await fetch(API_USERS);
    const json = await response.json();

    dispatch(receiveAllUsers(json));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsersFromGroup = groupId => async dispatch => {
  if (groupId !== 'new') {
    try {
      dispatch(requestUsers());
      const response = await fetch(API_GROUPS_ID_USERS(groupId));
      const json = await response.json();
      dispatch(receiveCurrentUsers(json));
    } catch (error) {
      console.error(error);
    }
  }
};

export const fetchUsersFromClass = classId => async dispatch => {
  try {
    dispatch(requestUsers());
    const response = await fetch(API_CLASSES_ID_USERS(classId));
    const json = await response.json();

    if (response.ok) {
      dispatch(receiveCurrentUsers(json));
    } else {
      dispatch(clearCurrentGroup());
      dispatch(createNotification(json.message, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error.message);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

export const updateUserFromClass = (classId, userId, body) => async dispatch => {
  try {
    const response = await fetch(API_CLASSES_ID_USERS_ID(classId, userId), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      dispatch(fetchUsersFromClass(classId));
    } else {
      console.error((response.statusText));
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Update user's roles by id
export const changeUserRoles = (userId, roles) => async dispatch => {
  try {
    const response = await fetch(API_USERS_ID_ROLES(userId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roles),
    });


    if (response.ok) {
      const newUser = await response.json();
      dispatch(updateUserRoles(newUser));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.status === 403) {
      dispatch(createNotification(`It is forbidden to change roles for yourself`, store.getState().notifications.types.error));
      console.error((response.statusText));
    }
  } catch (error) {
    dispatch(createNotification(`${error.message}`, store.getState().notifications.types.error));
    console.error(error.message);
  }
};

// Adding user in DB
export const addSingleUser = (adName, roles) => async dispatch => {
  try {
    const response = await fetch(API_USERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adName,
        roles,
      }),
    });


    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const newUser = await response.json();
      dispatch(addUser(newUser));
    } else {
      console.error((response.statusText));
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Deleting user from DB
export const deleteUserGlobal = user => async dispatch => {
  try {
    const response = await fetch(API_USERS_ID(user.id), { method: 'DELETE' });

    if (response.ok) {
      dispatch(deleteUser(user));
      dispatch(createNotification(`${user.lastName} ${user.firstName} was deleted!`, store.getState().notifications.types.success));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else {
      dispatch(createNotification(response.statusText, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error.message);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isUsersLoaded: false,
      };

    case RECEIVE_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        isUsersLoaded: true,
      };

    case REQUEST_CURRENT_USERS:
      return {
        ...state,
        isCurrentUsersLoaded: false,
      };

    case RECEIVE_CURRENT_USERS:
      return {
        ...state,
        currentUsers: action.payload,
        isCurrentUsersLoaded: true,
      };

    case RECEIVE_USERS_IN_GROUPS:
      return {
        ...state,
        usersInGroups: action.payload,
        isUsersLoaded: true,
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(({ id }) =>
          id !== action.payload.id),
        currentUsers: state.currentUsers.filter(({ adName }) =>
          adName !== action.payload.adName),
        activeUserId: state.activeUserId === action.payload.id
          ? null
          : state.activeUserId,
      };

    case DELETE_CURRENT_USER:
      return {
        ...state,
        currentUsers: state.currentUsers.filter(user =>
          user.adName !== action.payload,
        ),
      };

    case ADD_USER:
      return {  // TODO: combineReducers / reduce reducers
        ...state,
        users: [...state.users, action.payload],
        currentUsers: state.currentUsers.filter(user =>
          user.adName !== action.payload.adName,
        ),
      };

    case ADD_TEMP_USER_TO_GROUP:
      return {
        ...state,
        currentUsers: [...state.currentUsers, action.payload],
      };

    case CHANGE_GROUP:
      return {
        ...state,
        users: state.users.map(user =>
          (user.id === action.payload.id
            ? ({
              ...user,
              groupId: action.payload.groupId,
            })
            : user),
        ),
        activeUserId: null,
      };

    case SET_ACTIVE:
      return {
        ...state,
        activeUserId: action.payload,
      };

    case CLEAR_CURRENT_GROUP:
      return {
        ...state,
        currentUsers: [],
      };
    case GET_USER_PROFILE_ASYNC.PENDING: {
      return {
        ...state,
        activeUserFetching: true,
      };
    }
    case GET_USER_PROFILE_ASYNC.SUCCESS: {
      return {
        ...state,
        activeUser: action.payload,
        activeUserFetching: false,
      };
    }
    case GET_USER_PROFILE_ASYNC.ERROR: {
      return {
        ...state,
        activeUserFetching: false,
      };
    }

    case SET_CURRENT_USERS_LOADED:
      return {
        ...state,
        isCurrentUsersLoaded: action.payload,
      };

    case UPDATE_USER_ROLES:
      return {
        ...state,
        users: state.users.map(user =>
          (user.id === action.payload.id
            ? action.payload
            : user),
        ),
      };

    case UPDATE_CURRENT_USER_ROLES:
      return {
        ...state,
        currentUsers: state.currentUsers.map(user =>
          (user.adName === action.payload.adName
            ? {
              ...user,
              roles: action.payload.roles,
            }
            : user),
        ),
      };


    default:
      return state;
  }
};
