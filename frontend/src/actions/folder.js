import { CREATE_FOLDER, CREATE_FOLDER_FAIL, GET_FOLDERS, GET_FOLDER, GET_FOLDERS_FAIL, DELETE_FOLDER, FOLDER_LOADING } from "./types";
import axios from "axios";
import { message } from "antd";

export const createFolder = ({ title, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/folders/add`, { title });
    dispatch({ type: CREATE_FOLDER, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const getFolder = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/folders/${id}`);
    dispatch({ type: GET_FOLDER, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const getAllFolders = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/folders`);
    dispatch({ type: GET_FOLDERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const deleteFolder = ({ project_id, folder_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/folders/${folder_id}`);
    dispatch({ type: DELETE_FOLDER, payload: folder_id });
    message.success("Folder deleted");
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const setLoading = () => {
  return {
    type: FOLDER_LOADING
  };
};
