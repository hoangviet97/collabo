import { GET_FILES, UPLOAD_FILE, GET_FOLDER_FILES, MOVE_TO_FOLDER, FILE_DETAIL, FILE_LOADING, GET_FILE_TYPES, DELETE_FILE, GET_TASK_FILES, UPLOAD_ATTACH_FILE, EJECT_FILE } from "../actions/types";
import { file } from "../../types/types";

interface fileState {
  files: file[];
  folder_files: any[];
  task_files: any[];
  fileDetail: any;
  loading: boolean;
  statistics: any[];
  total: number;
}

const initialState = {
  files: [],
  folder_files: [],
  task_files: [],
  fileDetail: {},
  loading: false,
  statistics: [],
  total: 0
};

function fileReducer(state: fileState = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        files: [...state.files, payload],
        total: state.total + parseInt(payload.size)
      };
    case UPLOAD_ATTACH_FILE:
      return {
        ...state,
        loading: false,
        task_files: [...state.task_files, payload]
      };
    case GET_FILES:
      const filteredFiles = payload.filter((item: file) => item.folders_id === null);

      return {
        ...state,
        files: filteredFiles
      };
    case GET_TASK_FILES:
      return {
        ...state,
        task_files: payload,
        loading: false
      };
    case GET_FOLDER_FILES:
      return {
        ...state,
        folder_files: payload,
        loading: false
      };
    case GET_FILE_TYPES:
      const fileSum = payload.map((item: any) => parseInt(item.sum)).reduce((partialSum: any, a: any) => partialSum + a, 0);

      return {
        ...state,
        statistics: payload,
        total: parseInt(fileSum)
      };
    case MOVE_TO_FOLDER:
      return {
        ...state,
        files: state.files.filter((item: file) => item.id !== payload.id)
      };
    case FILE_DETAIL:
      return {
        ...state,
        fileDetail: payload
      };
    case DELETE_FILE:
      return {
        ...state,
        task_files: state.task_files.filter((item: any) => item.id !== payload),
        files: state.files.filter((item: any) => item.id !== payload)
      };
    case EJECT_FILE:
      return {
        ...state,
        task_files: state.task_files.filter((item: any) => item.id !== payload)
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
