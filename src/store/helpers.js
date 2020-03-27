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
], fn) => (payload, meta) => async dispatch => {
  dispatch(createAction(PENDING).call(null, payload, meta));
  try {
    const result = await fn.call(null, payload) || payload;
    await dispatch(createAction(SUCCESS).call(null, result, meta));
  } catch (error) {
    console.log(error);
    dispatch(createAction(ERROR).call(null, payload, meta, error));
  }
};

export const createActionAsync = (type, fn) =>
  createActionAsyncByTypes(getAsyncTypes(type).asArray(), fn);
