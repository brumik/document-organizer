import {
  State,
  ActionTypes,
  Action,
  FilterStatus
} from './types';

const initialState: State = {
  status: FilterStatus.active,
  tags: [],
  search: '',
};

const reducer = (
  state = initialState,
  action: ActionTypes
): State => {
  switch (action.type) {
    case Action.setStatus:
      return {
        ...state,
        status: action.payload,
      };
    case Action.setTags:
      return {
        ...state,
        tags: action.payload,
      };
    case Action.toggleTag:
      return {
        ...state,
        tags: state.tags.includes(action.payload)
          ? state.tags.filter(tag => tag !== action.payload)
          : [...state.tags, action.payload],
      };
    case Action.setSearch:
      return {
        ...state,
        search: action.payload,
      };
    case Action.reset:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
