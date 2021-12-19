import { combineReducers, createStore } from 'redux';
import settingsReducer from './settings';
import databaseReducer from './database';
export * from './hooks';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  database: databaseReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;