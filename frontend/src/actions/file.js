import { GET_FILES, UPLOAD_FILE, GET_INVITATIONS_FAIL, MOVE_TO_FOLDER, DELETE_FILE, GET_FOLDER_FILES, GET_TASK_FILES, FILE_DETAIL, FILE_LOADING, GET_FILE_TYPES, UPDATE_FOLDER_NUM, UPLOAD_ATTACH_FILE, EJECT_FILE } from "./types";
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
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const uploadAttachFile = ({ project_id, formData, task }) => async (dispatch) => {
  dispatch(setFileLoading());
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/tasks/${task}/files/attachment/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch({ type: UPLOAD_ATTACH_FILE, payload: res.data });
    message.success("File successfuly uploaded");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/files/${id}`);
    dispatch({ type: DELETE_FILE, payload: id });
    message.success("File deleted successfuly!");
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};

export const ejectFile = ({ project_id, id, task_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/tasks/${task_id}/files/${id}/eject`);
    dispatch({ type: EJECT_FILE, payload: id });
    message.success("File ejected successfuly!");
    console.log(res);
  } catch (err) {
    console.log(err.response);
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

export const getFilesByTask = ({ id, project_id }) => async (dispatch) => {
  try {
    dispatch(setFileLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/tasks/${id}/files`);
    dispatch({ type: GET_TASK_FILES, payload: res.data });
    console.log(res);
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
