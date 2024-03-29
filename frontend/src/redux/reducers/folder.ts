import { CREATE_FOLDER, GET_FOLDERS, GET_FOLDER, UPDATE_FOLDER_NUM, DELETE_FOLDER, FOLDER_LOADING } from "../actions/types";
import { folder, folderDetail, IFolderAction } from "../../types/types";

interface folderState {
  folders: folder[];
  folder: folderDetail;
  loading: boolean;
}

const initialState = {
  folders: [],
  folder: { id: "", title: "", projects_id: "", created_at: new Date() },
  loading: false
};

function folderReducer(state: folderState = initialState, action: IFolderAction) {
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
      const ind: any = updatedFolders.findIndex((i: folder) => i.id === payload);
      const num = updatedFolders[ind].total_files;

      return {
        ...state,
        folders: state.folders.map((item: folder) => (item.id === payload ? { ...item, total_files: num + 1 } : item))
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
