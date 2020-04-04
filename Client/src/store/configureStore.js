import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import * as NotificationsStore from './notificationsStore';
import * as QuestionsStore from './questionsStore';


export default function configureStore(history, initialState) {
  // List of middlewares
  const middleware = [thunk, routerMiddleware(history)];

  // Use the browser's Redux dev tools extension if installed
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Combine all reducers into one
  const rootReducer = historyFromCreateStore => combineReducers({

    notifications: NotificationsStore.reducer,
    questions: QuestionsStore.reducer,
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
