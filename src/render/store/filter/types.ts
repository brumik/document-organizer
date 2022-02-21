export enum FilterStatus {
  active = 'isActive',
  starred = 'isStarred',
  archived = 'isArchived',
}

export interface State {
  status: FilterStatus;
  tags: string[];
  search: string;
}

export enum Action {
  setStatus = 'FILTER_setStatus',
  setTags = 'FILTER_setTags',
  toggleTag = 'FILTER_toggleTag',
  setSearch = 'FILTER_setSearch',
  reset = 'FILTER_reset',
}

interface SetStatusAction {
  type: Action.setStatus;
  payload: FilterStatus;
}

interface SetTagsAction {
  type: Action.setTags;
  payload: string[];
}

interface ToggleTagAction {
  type: Action.toggleTag;
  payload: string;
}

interface SetSearchAction {
  type: Action.setSearch;
  payload: string;
}

interface ResetAction {
  type: Action.reset;
}

export type ActionTypes =
  | SetStatusAction
  | SetTagsAction
  | ToggleTagAction
  | SetSearchAction
  | ResetAction;
