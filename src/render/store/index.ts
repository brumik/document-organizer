import { combineReducers, createStore } from 'redux';
import settings from './settings';
import database from './database';
import notifications from './notifications';
export * from './hooks';

export const rootReducer = combineReducers({
  settings,
  database,
  notifications,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;