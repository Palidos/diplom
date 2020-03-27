import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import * as CoursesStore from './coursesStore';
import * as DateStore from './dateStore';
import * as EventStore from './eventsStore';
import * as GroupsStore from './groupsStore';
import * as IdentityStore from './identityStore';
import * as NotificationsStore from './notificationsStore';
import * as RoomsStore from './roomsStore';
import * as UserStore from './usersStore';


export default function configureStore(history, initialState) {
  // List of middlewares
  const middleware = [thunk, routerMiddleware(history)];

  // Use the browser's Redux dev tools extension if installed
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Combine all reducers into one
  const rootReducer = historyFromCreateStore => combineReducers({
    date: DateStore.reducer,
    groups: GroupsStore.reducer,
    identity: IdentityStore.reducer,
    rooms: RoomsStore.reducer,
    users: UserStore.reducer,
    events: EventStore.reducer,
    notifications: NotificationsStore.reducer,
    courses: CoursesStore.reducer,
    router: connectRouter(history),
  });

  // Returnind new binded store
  return createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );
}
