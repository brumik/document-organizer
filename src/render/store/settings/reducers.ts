import {
  State,
  ActionTypes,
  Action
} from './types';

const initialState: State = {
  rootFolder: '',
  windowBounds: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
};

const reducer = (
  state = initialState,
  action: ActionTypes
): State => {
  switch (action.type) {
    case Action.setRootFolder:
      window.api.settings.send('setRootFolder');
      return state;
    case Action.sync:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
