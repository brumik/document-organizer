import {
  State,
  ActionTypes,
  Action
} from './types';

const initialState: State = {
  projects: {},
  documents: {},
};

const reducer = (
  state = initialState,
  action: ActionTypes
): State => {
  switch (action.type) {
    case Action.setAll:
      // TODO DELETE
      window.api.database.send('setAll', action.payload);
      return action.payload;
    case Action.sync:
      return action.payload;
    case Action.selectDocumentToUploadResponse:
      return {
        ...state,
        meta: {
          ...state.meta,
          selectedPath: action.payload
      }
    };
    default:
      const actionName = action.type.split('_')[1];
      window.api.database.send(actionName, action.payload);
      return state;
  }
}

export default reducer;
