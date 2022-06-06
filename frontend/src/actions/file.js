import { GET_FILES, UPLOAD_FILE, GET_INVITATIONS_FAIL, MOVE_TO_FOLDER, GET_FOLDER_FILES, FILE_DETAIL, FILE_LOADING, GET_FILE_TYPES, UPDATE_FOLDER_NUM } from "./types";
import axios from "axios";
import { message } from "antd";

export const uploadFile = ({ project_id, formData }) => async (dispatch) => {
  dispatch(setFileLoading());
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch({ type: UPLOAD_FILE, payload: res.data });
    message.success("File successfuly uploaded");
  } catch (err) {
    console.log(err);
  }
};

export const downloadFile = ({ project_id }) => async (dispatch) => {
  try {
    //const res = await axios.get(`http://localhost:9000/api/${project_id}/files/${}/download`);
    //dispatch({ type: GET_FILES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/files/${id}`);
    //dispatch({ type: GET_FILES, payload: res.data });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const getAllFiles = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/files`);
    dispatch({ type: GET_FILES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getFilesByFolder = ({ id, project_id }) => async (dispatch) => {
  try {
    dispatch(setFileLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/folders/${id}/files`);
    dispatch({ type: GET_FOLDER_FILES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getFileTypes = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/files/types`);
    dispatch({ type: GET_FILE_TYPES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const moveToFolder = ({ project_id, id, folder_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/files/${id}/move-folder`, { folder_id });
    dispatch({ type: MOVE_TO_FOLDER, payload: { id: id } });
    dispatch({ type: UPDATE_FOLDER_NUM, payload: { id: folder_id } });
    message.success("This is a success message");
  } catch (err) {
    console.log(err);
  }
};

export const getFileDetail = ({ file }) => (dispatch) => {
  try {
    dispatch({ type: FILE_DETAIL, payload: file });
  } catch (err) {
    console.log(err);
  }
};

export const setFileLoading = () => {
  return {
    type: FILE_LOADING
  };
};
