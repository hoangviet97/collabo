import { GET_FILES, MOVE_TO_FOLDER, FILE_DETAIL } from "../../actions/types";

const initialState = {
  files: [],
  fileDetail: {}
};

function fileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILES:
      return {
        ...state,
        files: payload
      };
    case MOVE_TO_FOLDER:
      return {
        ...state,
        files: state.files.map((item) => (item.id === payload.id ? { ...item, folders_id: payload.folder_id } : item))
      };
    case FILE_DETAIL:
      return {
        ...state,
        fileDetail: payload
      };
    default:
      return state;
  }
}

export default fileReducer;
