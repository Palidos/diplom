// import { CancelToken } from 'axios';

// import * as service from './apiClient';
// import { API_USERS_ID, API_USERS_SEARCH } from './endpoints';

// export const getUserProfile = userId => service.get(API_USERS_ID(userId));

// let cancelSearchUsersFn = () => { };

// export const cancelSearchUsers = () => cancelSearchUsersFn();

// export const searchUsers = async query => {
//   return service.get(API_USERS_SEARCH, {
//     surname: query,
//     _: Date.now(),
//   }, { cancelToken: new CancelToken(c => { cancelSearchUsersFn = c; }) });
// };
