import {
  Action,
  ActionTypes,
  FilterStatus
} from './types';

export const setStatus = (status: FilterStatus): ActionTypes => ({
  type: Action.setStatus,
  payload: status
});

export const setTags = (tags: string[]): ActionTypes => ({
  type: Action.setTags,
  payload: tags
});

export const toggleTag = (tag: string): ActionTypes => ({
  type: Action.toggleTag,
  payload: tag
});

export const setSearch = (search: string): ActionTypes => ({
  type: Action.setSearch,
  payload: search
});

export const reset = (): ActionTypes => ({
  type: Action.reset
});
