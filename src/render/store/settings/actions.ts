import {
  Action,
  ActionTypes,
  State
} from './types';

export const setRootFolder = (): ActionTypes => ({
  type: Action.setRootFolder,
});

export const toggleNotificationEnabled = (): ActionTypes => ({
  type: Action.toggleNotificationEnabled,
});

export const sendTestNotification = (): ActionTypes => ({
  type: Action.sendTestNotification,
});

export const sync = (state: State): ActionTypes => ({
  type: Action.sync,
  payload: state
});
