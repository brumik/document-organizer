export interface State {
  rootFolder: string;
  windowBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export enum Action {
  setRootFolder = 'SETTINGS_setRootFolder',
  sync = 'SETTINGS_sync',
}

interface SetRootFolderAction {
  type: Action.setRootFolder;
}

interface SyncAction {
  type: Action.sync;
  payload: State;
}

export type ActionTypes =
  | SetRootFolderAction
  | SyncAction;
