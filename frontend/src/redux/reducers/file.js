import { GET_FILES, UPLOAD_FILE, MOVE_TO_FOLDER, FILE_DETAIL, FILE_LOADING } from "../../actions/types";

const initialState = {
  files: [],
  fileDetail: {},
  loading: false
};

function fileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false
      };
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
    case FILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default fileReducer;
