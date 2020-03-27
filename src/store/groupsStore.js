import { store } from '../index';
import { API_GROUPS, API_GROUPS_ID } from '../services/api/endpoints';
import * as groupService from '../services/api/groups';
import {
  createAction,
  // createActionAsyncByTypes,
  createActionAsync,
  getAsyncTypes,
} from './helpers';
import { createNotification } from './notificationsStore';

// Action Types
const REQUEST_GROUPS = 'REQUEST_GROUPS';
const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
const REMOVE_GROUP = 'REMOVE_GROUP';
const ADD_GROUP = 'ADD_GROUP';
const SAVE_GROUP = 'SAVE_GROUP';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const EDIT_SCHEDULE = 'EDIT_SCHEDULE';

const CREATE_GROUP = 'CREATE_GROUP';
const CREATE_GROUP_ASYNC = getAsyncTypes(CREATE_GROUP);

const GET_GROUPS = 'GET_GROUPS';

const UPDATE_GROUP = 'UPDATE_GROUP';
const UPDATE_GROUPS_ASYNC = getAsyncTypes(UPDATE_GROUP);

const SET_STAGED_GROUP_ID = 'SET_STAGED_GROUP_ID';

const SET_GROUP_USERS = 'SET_GROUP_USERS';


// Initial State
const initialState = {
  colors: [
    'rgb(0, 166, 255)',
    'rgb(61, 69, 194)',
    'rgb(117, 86, 214)',
    'rgb(0, 155, 136)',
    'rgb(113, 202, 0)',
    'rgb(255, 57, 30)',
    'rgb(255, 240, 0)',
    'rgb(255, 149, 0)',
    'rgb(131, 83, 68)',
    'rgb(240, 0, 109)',
    'rgb(121, 142, 160)',
    'rgb(254, 142, 120)',
  ],
  levels: [
    'Pre-Intermediate',
    'Low-Intermediate',
    'Intermediate',
    'Intermediate-Plus',
    'Upper-Intermediate',
    'Advanced',
  ],
  hours: [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ],
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  groups: [],
  isGroupsLoaded: false,
  saveStatus: null,
  stagedGroup: null,
};

export const setStagedGroupId = createAction(SET_STAGED_GROUP_ID);


// Actions (dispatchers)
const requestGroups = () => ({ type: REQUEST_GROUPS });

const receiveGroups = groups => ({
  type: RECEIVE_GROUPS,
  payload: groups,
});


export const removeGroup = groupId => ({
  type: REMOVE_GROUP,
  payload: groupId,
});

export const addGroup = groupId => ({
  type: ADD_GROUP,
  payload: groupId,
});

export const saveGroup = ({
  groupName,
  colorId,
},
selectedGroupId,
) => ({
  type: SAVE_GROUP,
  payload: {
    groupName,
    colorId,
    selectedGroupId,
  },
});

export const deleteSchedule = (scheduleId, groupId) => ({
  type: DELETE_SCHEDULE,
  payload: {
    scheduleId,
    groupId,
  },
});

export const editSchedule = (
  groupId,
  start,
  end,
  room,
  id,
) => ({
  type: EDIT_SCHEDULE,
  payload: {
    groupId,
    start,
    end,
    room,
    id,
  },
});


export const createGroup = createActionAsync(CREATE_GROUP, groupService.createGroup);
export const getGroups = createActionAsync(GET_GROUPS, groupService.getGroups);
export const updateGroup = createActionAsync(UPDATE_GROUP, groupService.updateGroup);
export const setGroupUsers = (group, users) => createActionAsync(
  SET_GROUP_USERS,
  groupService.setGroupUsers.bind(groupService, group, users),
).call(null, {
  group,
  users,
});

export const createGroupAndSaveUsers = (group, users) => async (dispatch, getState) => {
  await dispatch(createGroup(group));
  const groupId = await getState().groups.stagedGroup;
  await dispatch(setGroupUsers({ id: groupId }, users));

  return groupId;
};

export const updateGroupAndSaveUsers = (group, users) => async dispatch => {
  await dispatch(updateGroup(group));
  await dispatch(setGroupUsers({ id: group.id }, users));
};

// Complex Action Creators

// Fetching groups from API
export const fetchGroups = () => async dispatch => {
  try {
    dispatch(requestGroups());

    const response = await fetch(API_GROUPS);

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    }

    const json = await response.json();

    dispatch(receiveGroups(json));
  } catch (error) {
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
    console.error(error);
  }
};

export const deleteGroup = groupId => async dispatch => {
  try {
    dispatch(removeGroup(groupId));
    const response = await fetch(API_GROUPS_ID(groupId), { method: 'DELETE' });

    if (response.status === 401) { window.location = response.headers.get('Location'); }
  } catch (error) {
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
    console.error(error);
  }
};

const mapGroupDTOToUI = group => {
  return {
    groupName: group.name,
    id: group.id,
    colorId: group.color,
    teacherId: group.teacherId,
    status: group.status,
  };
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GROUPS:
      return {
        ...state,
        isGroupsLoaded: false,
      };

    case RECEIVE_GROUPS:
      return {
        ...state,
        groups: action.payload.map(({
          name,
          id,
          color,
          teacherId,
          status,
        }) => ({
          groupName: name,
          id,
          colorId: color,
          teacherId,
          status,
        })),
        isGroupsLoaded: true,
      };

    case REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(({ id }) =>
          id !== action.payload),
      };

    case ADD_GROUP:
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            groupName: 'New group',
            id: action.payload,
            levelId: '',
            colorId: 0,
            schedule: [],
            testDates: [],
          },
        ],
        stagedGroup: action.payload,
      };

    case SAVE_GROUP:
      return {
        ...state,
        groups: state.groups.map(group =>
          (group.id === action.payload.selectedGroupId
            ? {
              ...group,
              groupName: action.payload.groupName,
              colorId: action.payload.colorId,
            }
            : group),
        ),
      };

    case DELETE_SCHEDULE:
      return {
        ...state,
        groups: state.groups.map(group =>
          (group.id === action.payload.groupId
            ? {
              ...group,
              schedule: group.schedule.filter(({ id }) =>
                id !== action.payload.scheduleId,
              ),
            }
            : group),
        ),
      };

    case EDIT_SCHEDULE:
      return {
        ...state,
        groups: state.groups.map(group =>
          (group.id === action.payload.groupId
            ? {
              ...group,
              schedule: group.schedule.map(schedule =>
                (schedule.id === action.payload.id
                  ? {
                    ...schedule,
                    ...action.payload,
                  }
                  : schedule),
              ),
            }
            : group),
        ),
      };

    case CREATE_GROUP_ASYNC.PENDING: {
      return {
        ...state,
        isLoadingGroups: true,
      };
    }
    case CREATE_GROUP_ASYNC.SUCCESS: {
      return {
        ...state,
        groups: [...state.groups, mapGroupDTOToUI(action.payload)],
        isLoadingGroups: false,
        stagedGroup: action.payload.id,
      };
    }
    case CREATE_GROUP_ASYNC.ERROR: {
      return {
        ...state,
        isLoadingGroups: false,
      };
    }
    case UPDATE_GROUPS_ASYNC.PENDING: {
      return {
        ...state,
        isLoadingGroups: true,
      };
    }
    case UPDATE_GROUPS_ASYNC.SUCCESS: {
      return {
        ...state,
        groups: state.groups.map(group => {
          if (group.id !== action.payload.id) {
            return group;
          }
          return mapGroupDTOToUI(action.payload);
        }),
        isLoadingGroups: false,
      };
    }
    case UPDATE_GROUPS_ASYNC.ERROR: {
      return {
        ...state,
        isLoadingGroups: false,
      };
    }
    case SET_STAGED_GROUP_ID: {
      return {
        ...state,
        stagedGroup: action.payload,
      };
    }

    default:
      return state;
  }
};
