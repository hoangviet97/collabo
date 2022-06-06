import { GET_FILES, UPLOAD_FILE, GET_FOLDER_FILES, MOVE_TO_FOLDER, FILE_DETAIL, FILE_LOADING, GET_FILE_TYPES } from "../../actions/types";

const initialState = {
  files: [],
  fileDetail: {},
  loading: false,
  statistics: [],
  total: 0
};

function fileReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        files: [...state.files, payload],
        total: state.total + payload.size
      };
    case GET_FILES:
      const filteredFiles = payload.filter((item: any) => item.folders_id === null);

      return {
        ...state,
        files: filteredFiles
      };
    case GET_FOLDER_FILES:
      return {
        ...state,
        files: payload,
        loading: false
      };
    case GET_FILE_TYPES:
      const fileSum = payload.map((item: any) => parseInt(item.sum)).reduce((partialSum: any, a: any) => partialSum + a, 0);

      return {
        ...state,
        statistics: payload,
        total: fileSum
      };
    case MOVE_TO_FOLDER:
      return {
        ...state,
        files: state.files.filter((item: any) => item.id !== payload.id)
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
