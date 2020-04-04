import { createNotification } from './notificationsStore';

export const createAction = type => (payload, meta, error) => ({
  type,
  payload,
  meta,
  error,
});

export const getAsyncTypes = type => {
  const types = [
    `${type}_PENDING`,
    `${type}_SUCCESS`,
    `${type}_ERROR`,
  ];
  return {
    PENDING: types[0],
    SUCCESS: types[1],
    ERROR: types[2],
    asArray: () => types,
  };
};

export const createActionAsyncByTypes = ([
  PENDING,
  SUCCESS,
  ERROR,
], fn) => (payload, { messageSuccess, messageError } = {}) => async (dispatch, getState) => {
  dispatch(createAction(PENDING)(payload));
  try {
    const result = await fn(payload) || payload;
    await dispatch(createAction(SUCCESS)(result));
    if (messageSuccess) {
      dispatch(createNotification(messageSuccess, getState().notifications.types.success));
    }
  } catch (error) {
    dispatch(createNotification(
      messageError || error.message, getState().notifications.types.error));
    dispatch(createAction(ERROR)(payload));
  }
};

export const createActionAsync = (type, fn) =>
  createActionAsyncByTypes(getAsyncTypes(type).asArray(), fn);
