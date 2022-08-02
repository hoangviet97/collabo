import { CREATE_FOLDER, GET_FOLDERS, GET_FOLDER, UPDATE_FOLDER_NUM, DELETE_FOLDER, FOLDER_LOADING } from "../../actions/types";
import { folder } from "../../types/types";

const initialState = {
  folders: [],
  folder: {},
  loading: false
};

function folderReducer(state = initialState, action: any) {
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
    case UPDATE_FOLDER_NUM:
      let updatedFolders: folder[] = state.folders;
      const ind: any = updatedFolders.findIndex((i: any) => i.id === payload.id);
      const num = updatedFolders[ind].total_files;

      return {
        ...state,
        folders: state.folders.map((item: folder) => (item.id === payload.id ? { ...item, total_files: num + 1 } : item))
      };
    case GET_FOLDERS:
      return {
        ...state,
        folders: payload,
        loading: false
      };
    case FOLDER_LOADING:
      return {
        ...state,
        loading: true
      };
    case DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter((item: folder) => item.id !== payload)
      };
    default:
      return state;
  }
}

export default folderReducer;
