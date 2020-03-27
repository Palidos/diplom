import { API_ROOMS, API_TEACHER_ROOMS } from '../services/api/endpoints';

// Action Types
const REQUEST_ROOMS = 'REQUEST_ROOMS';
const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
const TOGGLE_ROOM = 'TOGGLE_ROOM';
const SELECT_ALL_ROOMS = 'SELECT_ALL_ROOMS';
const UPDATE_TEACHER_ROOMS = 'UPDATE_TEACHER_ROOMS';


// Initial State
const initialState = {
  rooms: [],
  teacherRooms: [],
  isLoadingRooms: false,
};


// Actions (dispatchers)
const requestRooms = () => ({ type: REQUEST_ROOMS });

const receiveRooms = rooms => ({
  type: RECEIVE_ROOMS,
  payload: rooms,
});

export const toggleRoom = roomId => ({
  type: TOGGLE_ROOM,
  payload: roomId,
});

export const selectAllRooms = () => ({ type: SELECT_ALL_ROOMS });

const updateTeacherRooms = rooms => ({
  type: UPDATE_TEACHER_ROOMS,
  payload: rooms,
});


// Complex Action Creators

// Fetching rooms from API
export const fetchRooms = () => async dispatch => {
  try {
    dispatch(requestRooms());

    const response = await fetch(API_ROOMS);
    if (response.status === 401) {
      window.location = response.headers.get('Location');
    }

    const rooms = await response.json();

    dispatch(receiveRooms(rooms));
  } catch (error) {
    console.error(error);
  }
};

// Updating teacher's rooms
export const fetchTeacherRooms = () => async dispatch => {
  try {
    const response = await fetch(API_TEACHER_ROOMS);

    if (response.ok) {
      const rooms = await response.json();
      dispatch(updateTeacherRooms(rooms));
    } else if (response.status === 401) {
      window.location = response.headers.get('Location');
    }
  } catch (error) {
    console.error(error);
  }
};


// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ROOMS:
      return {
        ...state,
        isLoadingRooms: true,
      };

    case RECEIVE_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        isLoadingRooms: false,
      };

    case TOGGLE_ROOM:
      return {
        ...state,
        teacherRooms: state.teacherRooms.map((room, _, rooms) =>
          // All rooms are selected ? toggle others : toggle chosen room
          ((rooms.every(roomElement => roomElement.isSelected)
            ? room.id !== action.payload
            : room.id === action.payload)
            ? {
              ...room,
              isSelected: !room.isSelected,
            }
            : room),
        ),
      };

    case SELECT_ALL_ROOMS:
      return {
        ...state,
        teacherRooms: state.teacherRooms.map((room, _, rooms) => ({
          ...room,
          // All rooms are selected ? unselect all rooms : select all rooms
          isSelected: !(rooms.every(roomElement => roomElement.isSelected)),
        })),
      };

    case UPDATE_TEACHER_ROOMS:
      return {
        ...state,
        teacherRooms: action.payload.map(room => ({
          ...room,
          isSelected: true,
        })),
      };

    default:
      return state;
  }
};
