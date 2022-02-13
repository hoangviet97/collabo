import { CREATE_FOLDER, CREATE_FOLDER_FAIL, GET_FOLDERS, GET_FOLDER, GET_FOLDERS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createFolder = ({ title, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/folders/add", { title, project_id });
    console.log(res);
    dispatch({ type: CREATE_FOLDER, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const getFolder = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/folders/single`, { id });
    dispatch({ type: GET_FOLDER, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const getAllFolders = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/folders/all", { project_id });
    dispatch({ type: GET_FOLDERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const deleteFolders = ({ project_id, folder_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/folders/delete", { project_id, folder_id });
    dispatch({ type: GET_FOLDERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};
