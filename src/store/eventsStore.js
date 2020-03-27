import { store } from '../index';
import { DateLesson } from '../models';
import {
  API_CLASSES,
  API_CLASSES_ID,
  API_GROUPS_ID_SCHEDULES,
  API_CLASSES_ID_SCHEDULE,
  API_CLASSES_FROM_TO,
  API_STUDENT_CLASSES_FROM_TO,
} from '../services/api/endpoints';
import { createNotification } from './notificationsStore';

// Action Types
const REQUEST_EVENTS = 'REQUEST_EVENTS';
const REQUEST_STUDENT_EVENTS = 'REQUEST_STUDENT_EVENTS';
const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
const RECEIVE_EVENTS_FAILURE = 'RECEIVE_EVENTS_FAILURE';
const RECEIVE_WEEK_EVENTS = 'RECEIVE_WEEK_EVENTS';
const RECEIVE_STUDENT_WEEK_EVENTS = 'RECEIVE_STUDENT_WEEK_EVENTS';
const REQUEST_SINGLE_EVENT = 'REQUEST_SINGLE_EVENT';
const RECEIVE_SINGLE_EVENT = 'RECEIVE_SINGLE_EVENT';
const SET_EVENT_ACTIVE = 'SET_EVENT_ACTIVE';
const REMOVE_EVENT_ACTIVE = 'REMOVE_EVENT_ACTIVE';
const EDIT_EVENT = 'EDIT_EVENT';
const OPEN_ADD_EVENT = 'OPEN_ADD_EVENT';
const RECEIVE_NEW_EVENT = 'RECEIVE_NEW_EVENT';
const DELETE_SINGLE_EVENT = 'DELETE_SINGLE_EVENT';
const SET_NEW_SERIES_ID = 'SET_NEW_SERIES_ID';
const DELETE_OLD_SERIES_EVENTS = 'DELETE_OLD_SERIES_EVENTS';
const CLEAR_EVENTS = 'CLEAR_EVENTS';


// Initial State
const initialState = {
  events: [],
  classesOtherTeachers: [],
  activeEventId: null,
  activeEvent: null,
  isEventsLoaded: false,
  isSingleEventLoaded: false,
  newEvent: null,
  errorMessage: '',
};


// Actions (dispatchers)
export const requestEvents = () => ({ type: REQUEST_EVENTS });

export const requestStudentEvents = () => ({ type: REQUEST_STUDENT_EVENTS });

export const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  payload: events,
});

export const receiveEventsFailure = () => ({ type: RECEIVE_EVENTS_FAILURE });

export const receiveWeekEvents = data => ({
  type: RECEIVE_WEEK_EVENTS,
  payload: data,
});

export const receiveStudentWeekEvents = data => ({
  type: RECEIVE_STUDENT_WEEK_EVENTS,
  payload: data,
});

export const requestSingleEvent = () => ({ type: REQUEST_SINGLE_EVENT });

export const receiveSingleEvent = events => ({
  type: RECEIVE_SINGLE_EVENT,
  payload: events,
});

export const setEventActive = id => ({
  type: SET_EVENT_ACTIVE,
  payload: id,
});

export const removeEventActive = () => ({ type: REMOVE_EVENT_ACTIVE });

export const openAddEvent = event => ({
  type: OPEN_ADD_EVENT,
  payload: event,
});

export const receiveNewEvent = event => ({
  type: RECEIVE_NEW_EVENT,
  payload: event,
});

export const editEvent = event => ({
  type: EDIT_EVENT,
  payload: event,
});

export const deleteEvent = id => ({
  type: DELETE_SINGLE_EVENT,
  payload: id,
});

export const deleteOldSeriesEvents = seriesId => ({
  type: DELETE_OLD_SERIES_EVENTS,
  payload: seriesId,
});

export const clearEvents = () => ({ type: CLEAR_EVENTS });
// Complex Action Creators

// Fetching groups from API
export const fetchEvents = () => async dispatch => {
  try {
    dispatch(requestEvents());

    const response = await fetch(API_CLASSES);
    const json = await response.json();

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      dispatch(receiveEvents(json));
    } else {
      dispatch(receiveEventsFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Fetching groups from API
export const fetchEventsWithDateRange = (from, to) => async dispatch => {
  try {
    dispatch(requestEvents());

    const response = await fetch(API_CLASSES_FROM_TO(from, to));

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveWeekEvents(json));
    } else {
      dispatch(receiveEventsFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

export const fetchStudentsEventsWithDateRange = (from, to) => async dispatch => {
  try {
    dispatch(requestStudentEvents());

    const response = await fetch(API_STUDENT_CLASSES_FROM_TO(from, to));

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveStudentWeekEvents(json));
    } else {
      dispatch(receiveEventsFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Fetching a single event by ID
export const fetchSingleEvent = eventId => async dispatch => {
  try {
    dispatch(requestSingleEvent());

    const response = await fetch(API_CLASSES_ID(eventId));

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveSingleEvent(json));
    } else {
      dispatch(receiveEventsFailure());
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Adding new event
export const addEvent = body => async dispatch => {
  try {
    dispatch(requestEvents());

    const response = await fetch(API_CLASSES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveNewEvent(json));
      dispatch(setEventActive(json.id));
      dispatch(createNotification('New event was added successfully!', store.getState().notifications.types.success));
    } else {
      dispatch(receiveEventsFailure());
      dispatch(createNotification(response.statusText, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Adding new event series
export const addEventSeries = body => async dispatch => {
  try {
    dispatch(requestEvents());

    const response = await fetch(API_GROUPS_ID_SCHEDULES(body.groupId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) { // The event series isn't added
      const json = await response.json();
      dispatch(receiveNewEvent(json.firstClass));
      dispatch(setEventActive(json.firstClass.id));
      dispatch(createNotification('New event series was added successfully!', store.getState().notifications.types.success));
    } else {
      dispatch(removeEventActive());
      dispatch(receiveEventsFailure());
      dispatch(createNotification(response.statusText, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Editing existed event
export const editSingleEvent = body => async dispatch => {
  try {
    dispatch(requestEvents());
    const response = await fetch(API_CLASSES_ID(body.id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      dispatch(editEvent(body));
      dispatch(createNotification(`Changes saved!`, store.getState().notifications.types.success));
    } else {
      dispatch(receiveEventsFailure());
      dispatch(createNotification(response.statusText, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Editing existed event series
export const editEventSeries = body => async dispatch => {
  try {
    dispatch(requestEvents());
    const response = await fetch(API_CLASSES_ID_SCHEDULE(body.id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });


    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      const json = await response.json();
      dispatch(removeEventActive());
      dispatch(deleteOldSeriesEvents(json.id));
      dispatch(receiveNewEvent(json.firstClass));
      dispatch(setEventActive(json.firstClass.id));
      dispatch(createNotification(`Changes saved!`, store.getState().notifications.types.success));
    } else {
      dispatch(receiveEventsFailure());
      dispatch(createNotification(response.statusText, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Delete single event
export const deleteSingleEvent = id => async dispatch => {
  try {
    dispatch(requestEvents());
    const response = await fetch(API_CLASSES_ID(id), { method: 'DELETE' });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      dispatch(deleteEvent(id));
    } else {
      dispatch(receiveEventsFailure());
      dispatch(createNotification(`${response.statusText}: The event was not deleted!`, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};

// Delete event series
export const deleteEventSeries = id => async dispatch => {
  try {
    dispatch(requestEvents());
    const response = await fetch(API_CLASSES_ID_SCHEDULE(id), { method: 'DELETE' });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.ok) {
      dispatch(removeEventActive());
      await dispatch(deleteOldSeriesEvents(
        store.getState().events.events
          .find(event => event.id === id).scheduleId,
      ));
      dispatch(fetchEventsWithDateRange(...DateLesson.getStartEndWeek(store.getState().date.date)));
    } else {
      dispatch(receiveEventsFailure());
      dispatch(createNotification(`${response.statusText}: The event series was not deleted!`, store.getState().notifications.types.error));
    }
  } catch (error) {
    console.error(error);
    dispatch(createNotification(error.message, store.getState().notifications.types.error));
  }
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        events: state.events.filter(event => event.groupName !== null),
        isEventsLoaded: false,
      };

    case REQUEST_STUDENT_EVENTS:
      return {
        ...state,
        events: state.events.filter(event => event.groupName === null),
        isEventsLoaded: false,
      };

    case RECEIVE_EVENTS:
      return {
        ...state,
        events: action.payload.filter(newEvent =>
          !(newEvent.cancelled),
        ),
        isEventsLoaded: true,
        errorMessage: '',
        newEvent: null,
      };

    case RECEIVE_EVENTS_FAILURE:
      return {
        ...state,
        isEventsLoaded: true,
      };

    case RECEIVE_WEEK_EVENTS:
      return {
        ...state,
        events: [
          // If loaded classes have changes (color or name) => reload them
          ...state.events.filter(oldEvent =>
            !action.payload.classesTeacher.some(newEvent =>
              oldEvent.id === newEvent.id &&
              (oldEvent.color !== newEvent.color ||
                oldEvent.groupName !== newEvent.groupName),
            ),
          ),
          ...action.payload.classesTeacher.filter(newEvent =>
            !newEvent.cancelled &&
            !state.events.some(oldEvent =>
              oldEvent.id === newEvent.id &&
              (oldEvent.color === newEvent.color &&
                oldEvent.groupName === newEvent.groupName),
            ),
          ),
        ],
        classesOtherTeachers: [
          ...state.classesOtherTeachers,
          ...action.payload.classesOtherTeachers.filter(newEvent =>
            !state.classesOtherTeachers.some(oldEvent =>
              oldEvent.id === newEvent.id,
            ),
          ),
        ],
        isEventsLoaded: true,
        errorMessage: '',
        newEvent: null,
      };

    case RECEIVE_STUDENT_WEEK_EVENTS:
      return {
        ...state,
        events: [
          ...state.events,
          ...action.payload.filter(newEvent =>
            !newEvent.cancelled &&
            !state.events.some(oldEvent =>
              oldEvent.id === newEvent.id,
            ),
          ),
        ],
        isEventsLoaded: true,
      };

    case REQUEST_SINGLE_EVENT:
      return {
        ...state,
        isSingleEventLoaded: false,
      };

    case RECEIVE_SINGLE_EVENT:
      return {
        ...state,
        activeEvent: action.payload,
        isSingleEventLoaded: true,
      };

    case SET_EVENT_ACTIVE:
      return {
        ...state,
        activeEventId: action.payload,
        newEvent: null,
      };

    case REMOVE_EVENT_ACTIVE:
      return {
        ...state,
        activeEventId: null,
        newEvent: null,
      };

    case EDIT_EVENT:
      return {
        ...state,
        events: state.events
          .filter(newEvent =>
            !(newEvent.cancelled),
          )
          .map(event =>
            (event.id === action.payload.id
              ? {
                ...event,
                ...action.payload,
                scheduleId: null,
              }
              : event),
          ),
        isEventsLoaded: true,
        activeEvent: {
          ...state.activeEvent,
          ...action.payload,
          scheduleId: null,
        },
      };

    case OPEN_ADD_EVENT:
      return {
        ...state,
        activeEventId: null,
        newEvent: action.payload,
      };

    case RECEIVE_NEW_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        newEvent: null,
        isEventsLoaded: true,
      };

    case DELETE_SINGLE_EVENT:
      return {
        ...state,
        events: state.events.filter(({ id }) =>
          id !== action.payload,
        ),
        activeEventId: null,
        isEventsLoaded: true,
        errorMessage: '',
      };

    case SET_NEW_SERIES_ID:
      return {
        ...state,
        newSeriesId: action.payload,
      };

    case DELETE_OLD_SERIES_EVENTS:
      return {
        ...state,
        events: state.events.filter(event =>
          event.scheduleId !== action.payload,
        ),
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        activeEventId: null,
        activeEvent: null,
        newEvent: null,
        isSingleEventLoaded: false,
      };

    default:
      return state;
  }
};
