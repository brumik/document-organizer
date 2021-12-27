import {
  Action,
  ActionTypes,
  State
} from './types';

export const sync = (state: State): ActionTypes => ({
  type: Action.sync,
  payload: state
});
