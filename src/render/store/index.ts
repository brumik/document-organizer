import { combineReducers, createStore } from 'redux';
import settings from './settings';
import database from './database';
import notifications from './notifications';
import filter from './filter';
export * from './hooks';

export const rootReducer = combineReducers({
  settings,
  database,
  notifications,
  filter,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;