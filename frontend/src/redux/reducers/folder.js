import { CREATE_FOLDER, GET_FOLDERS } from "../../actions/types";

const initialState = {
  folders: []
};

function folderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_FOLDER:
      return {
        ...state,
        folders: [...state.folders, payload]
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
