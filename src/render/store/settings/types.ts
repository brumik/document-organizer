import { Preferences } from "../../types";

export type State = Preferences;

export enum Action {
  setRootFolder = 'SETTINGS_setRootFolder',
  toggleNotificationEnabled = 'SETTINGS_setNotificationEnabled',
  sendTestNotification = 'SETTINGS_sendTestNotification',
  sync = 'SETTINGS_sync',
}

interface SetRootFolderAction {
  type: Action.setRootFolder;
}

interface SetNotificationEnabledAction {
  type: Action.toggleNotificationEnabled;
}

interface SendTestNotificationAction {
  type: Action.sendTestNotification;
}

interface SyncAction {
  type: Action.sync;
  payload: State;
}

export type ActionTypes =
  | SetRootFolderAction
  | SetNotificationEnabledAction
  | SendTestNotificationAction
  | SyncAction;
