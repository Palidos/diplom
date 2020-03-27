import {
  API_COURSES,
  API_COURSES_ID,
  API_COURSES_ID_USERS,
} from '../services/api/endpoints';
import { createNotification } from './notificationsStore';

// Action Types
const REQUEST_COURSES = 'REQUEST_COURSES';
const RECEIVE_COURSES = 'RECEIVE_COURSES';
const REQUEST_COURSE_TEACHERS = 'REQUEST_COURSE_TEACHERS';
const RECEIVE_COURSE_TEACHERS = 'RECEIVE_COURSE_TEACHERS';
const ADD_COURSE = 'ADD_COURSE';
const CREATE_COURSE = 'CREATE_COURSE';
const UPDATE_COURSE = 'UPDATE_COURSE';
const REMOVE_COURSE = 'REMOVE_COURSE';
const DELETE_COURSE_TEACHERS = 'DELETE_COURSE_TEACHERS';
const ADD_COURSE_TEACHERS = 'ADD_COURSE_TEACHERS';
const SET_STAGED_COURSE_ID = 'SET_STAGED_COURSE_ID';


// Initial State
const initialState = {
  courses: [],
  teachers: [],
  isCoursesLoaded: false,
  isTeachersLoaded: false,
  stagedCourse: null,
};


// Actions (dispatchers)
const requestCourses = () => ({ type: REQUEST_COURSES });


const receiveCourses = courses => ({
  type: RECEIVE_COURSES,
  payload: courses,
});

const requestCourseTeachers = () => ({ type: REQUEST_COURSE_TEACHERS });


const receiveCourseTeachers = teachers => ({
  type: RECEIVE_COURSE_TEACHERS,
  payload: teachers,
});

export const addCourse = courseId => ({
  type: ADD_COURSE,
  payload: courseId,
});

export const createCourse = (courseSettings, id) => ({
  type: CREATE_COURSE,
  payload: {
    id,
    ...courseSettings,
  },
});

export const updateCourse = course => ({
  type: UPDATE_COURSE,
  payload: course,
});

export const removeCourse = courseId => ({
  type: REMOVE_COURSE,
  payload: courseId,
});

export const deleteCourseTeacher = teacher => ({
  type: DELETE_COURSE_TEACHERS,
  payload: teacher,
});

export const addCourseTeacher = teacher => ({
  type: ADD_COURSE_TEACHERS,
  payload: teacher,
});

export const setStagedCourseId = id => ({
  type: SET_STAGED_COURSE_ID,
  payload: id,
});

// Complex Action Creators

// Fetching groups from API
export const fetchCourses = () => async (dispatch, getState) => {
  try {
    dispatch(requestCourses());

    const response = await fetch(API_COURSES);

    if (response.ok) {
      const json = await response.json();
      dispatch(receiveCourses(json));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    dispatch(createNotification(error.message, getState().notifications.types.error));
    console.error(error);
  }
};

export const fetchCourseTeachers = courseId => async (dispatch, getState) => {
  try {
    dispatch(requestCourseTeachers());

    const response = await fetch(API_COURSES_ID_USERS(courseId));

    if (response.ok) {
      const json = await response.json();
      dispatch(receiveCourseTeachers(json));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    dispatch(createNotification(error.message, getState().notifications.types.error));
    console.error(error);
  }
};

export const createCourseAndSaveSettings = course => async (dispatch, getState) => {
  try {
    // await dispatch(createCourse(course));
    const response = await fetch(API_COURSES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      const json = await response.json();
      await dispatch(createCourse(course, json.id));
      return json.id;
    } if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    dispatch(createNotification(error.message, getState().notifications.types.error));
    console.error(error);
  }
};

export const updateCourseAndSettings = course => async (dispatch, getState) => {
  try {
    const response = await fetch(API_COURSES_ID(course.id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      dispatch(updateCourse(course));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    } else if (response.status === 403) {
      dispatch(createNotification(`response.statusText`, getState().notifications.types.error));
      console.error(response.statusText);
    }
  } catch (error) {
    dispatch(createNotification(`${error.message}`, getState().notifications.types.error));
    console.error(error.message);
  }
};

export const deleteCourse = courseId => async (dispatch, getState) => {
  try {
    dispatch(removeCourse(courseId));
    const response = await fetch(API_COURSES_ID(courseId), { method: 'DELETE' });

    if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    dispatch(createNotification(error.message, getState().notifications.types.error));
    console.error(error);
  }
};

export const editCourseTeachers = (courseId, teachers) => async (dispatch, getState) => {
  try {
    const response = await fetch(API_COURSES_ID_USERS(courseId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teachers),
    });
    if (response.ok) {
      dispatch(fetchCourseTeachers(courseId));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    dispatch(createNotification(error.message, getState().notifications.types.error));
    console.error(error);
  }
};

const mapCourseDTOToUI = course => {
  return {
    id: course.id,
    name: course.name,
    hasAttendance: course.hasAttendance,
    hasFiles: course.hasFiles,
    hasHomework: course.hasHomework,
    hasHomeworkMark: course.hasHomeworkMark,
    hasTests: course.hasTests,
    status: course.status,
  };
};

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COURSES:
      return {
        ...state,
        isCoursesLoaded: false,
      };

    case RECEIVE_COURSES:
      return {
        ...state,
        courses: action.payload,
        isCoursesLoaded: true,
      };

    case REQUEST_COURSE_TEACHERS:
      return {
        ...state,
        isTeachersLoaded: false,
      };

    case RECEIVE_COURSE_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        isTeachersLoaded: true,
      };

    case ADD_COURSE:
      return {
        ...state,
        courses: [
          ...state.courses,
          {
            name: 'New course',
            id: action.payload,
          },
        ],
        stagedCourse: action.payload,
      };

    case CREATE_COURSE:
      return {
        ...state,
        courses: [...state.courses, mapCourseDTOToUI(action.payload)],
        isCoursesLoaded: true,
        stagedCourse: action.payload.id,
      };

    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course => {
          if (course.id !== action.payload.id) {
            return course;
          }
          return mapCourseDTOToUI(action.payload);
        }),
      };


    case REMOVE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(({ id }) =>
          id !== action.payload),
      };

    case ADD_COURSE_TEACHERS:
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };

    case DELETE_COURSE_TEACHERS:
      return {
        ...state,
        teachers: [...state.teachers.filter(({ adName }) => adName !== action.payload.adName)],
      };

    case SET_STAGED_COURSE_ID:
      return {
        ...state,
        stagedCourse: action.payload,
      };


    default:
      return state;
  }
};
