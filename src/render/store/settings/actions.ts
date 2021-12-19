import {
  Action,
  ActionTypes,
  State
} from './types';

export const setRootFolder = (): ActionTypes => ({
  type: Action.setRootFolder,
});

export const sync = (state: State): ActionTypes => ({
  type: Action.sync,
  payload: state
});
