import {
  State,
  ActionTypes,
  Action
} from './types';

const initialState: State = {
  projects: [],
  documents: [],
};

const reducer = (
  state = initialState,
  action: ActionTypes
): State => {
  switch (action.type) {
    case Action.sync:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
