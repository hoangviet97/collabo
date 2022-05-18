import { GET_FILES, UPLOAD_FILE, GET_INVITATIONS_FAIL, MOVE_TO_FOLDER, FILE_DETAIL, FILE_LOADING } from "./types";
import axios from "axios";
import { message } from "antd";

export const uploadFile = ({ formData }) => async (dispatch) => {
  dispatch(setFileLoading());
  try {
    const res = await axios.post("http://localhost:9000/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch({ type: UPLOAD_FILE, payload: "" });
    message.success("File successfuly uploaded");
  } catch (err) {
    console.log(err);
  }
};

export const downloadFile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:9000/api/files/download");
    //dispatch({ type: GET_FILES, payload: res.data });
    console.log(res);
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
    const res = await axios.post("http://localhost:9000/api/files/all", { project_id });
    dispatch({ type: GET_FILES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const moveToFolder = ({ id, folder_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/files/move-folder", { id, folder_id });
    dispatch({ type: MOVE_TO_FOLDER, payload: { id: id, folder_id: folder_id } });
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
