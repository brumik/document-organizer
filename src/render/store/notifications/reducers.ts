import {
  State,
  ActionTypes,
  Action
} from './types';

const initialState: State = [];

const reducer = (
  state = initialState,
  action: ActionTypes
): State => {
  switch (action.type) {
    case Action.addNotification:
      return [
        ...state,
        action.payload
      ];
    case Action.removeNotification:
      return state.filter(notification => notification.key !== action.payload);
    default:
      return state;
  }
}

export default reducer;
