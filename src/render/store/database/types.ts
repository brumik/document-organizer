import { Project, Document } from "../../types";

export interface State {
  projects: Project[];
  documents: Document[];
}

export enum Action {
  sync = 'DATABASE_sync'
}

interface SyncAction {
  type: Action.sync;
  payload: State;
}

export type ActionTypes =
  | SyncAction;
