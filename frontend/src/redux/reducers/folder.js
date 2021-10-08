import { CREATE_FOLDER, GET_FOLDERS, GET_FOLDER } from "../actions/types";

const initialState = {
  folders: [],
  folder: {}
};

function folderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_FOLDER:
      return {
        ...state,
        folders: [...state.folders, payload]
      };
    case GET_FOLDER:
      return {
        ...state,
        folder: payload
      };
    case GET_FOLDERS:
      return {
        ...state,
        folders: payload
      };
    default:
      return state;
  }
}

export default folderReducer;
