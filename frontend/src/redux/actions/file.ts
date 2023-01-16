import { GET_FILES, UPLOAD_FILE, GET_INVITATIONS_FAIL, GET_REVIEW_FILES, MOVE_TO_FOLDER, DELETE_FILE, GET_FOLDER_FILES, GET_TASK_FILES, FILE_DETAIL, FILE_LOADING, GET_FILE_TYPES, UPDATE_FOLDER_NUM, UPLOAD_ATTACH_FILE, EJECT_FILE } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";
import { AppDispatch } from "../store";

export const uploadFile = (project_id: string, formData: any) => async (dispatch: AppDispatch) => {
  dispatch(setFileLoading());
  try {
    const res = await axiosClient.post(`/${project_id}/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch({ type: UPLOAD_FILE, payload: res.data });
    message.success("File successfuly uploaded");
  } catch (err: any) {
    console.log(err);
  }
};

export const uploadAttachFile = (project_id: string, formData: any, task: string) => async (dispatch: AppDispatch) => {
  dispatch(setFileLoading());
  try {
    const res = await axiosClient.post(`/${project_id}/tasks/${task}/files/attachment/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch({ type: UPLOAD_ATTACH_FILE, payload: res.data });
    message.success("File successfuly uploaded");
  } catch (err: any) {
    console.log(err);
  }
};

export const deleteFile = (project_id: string, id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/files/${id}`);
    dispatch({ type: DELETE_FILE, payload: id });
    message.success("File deleted successfuly!");
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};

export const ejectFile = (project_id: string, id: string, task_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/tasks/${task_id}/files/${id}/eject`);
    dispatch({ type: EJECT_FILE, payload: id });
    message.success("File ejected successfuly!");
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};

export const getAllFiles = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/files`);
    dispatch({ type: GET_FILES, payload: res.data });
  } catch (err: any) {
    console.log(err);
  }
};

export const getFilesByFolder = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setFileLoading());
    const res = await axiosClient.get(`/${project_id}/folders/${id}/files`);
    dispatch({ type: GET_FOLDER_FILES, payload: res.data });
  } catch (err: any) {
    console.log(err);
  }
};

export const getFilesByTask = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setFileLoading());
    const res = await axiosClient.get(`/${project_id}/tasks/${id}/files`);
    dispatch({ type: GET_TASK_FILES, payload: res.data });
  } catch (err: any) {
    console.log(err);
  }
};

export const getFilesByReview = (review: any, id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setFileLoading());
    const res = await axiosClient.get(`/${project_id}/tasks/${id}/files`);
    dispatch({ type: GET_REVIEW_FILES, payload: { id: review, data: res.data } });
  } catch (err: any) {
    console.log(err);
  }
};

export const getFileTypes = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/files/types`);
    dispatch({ type: GET_FILE_TYPES, payload: res.data });
  } catch (err: any) {
    console.log(err);
  }
};

export const moveToFolder = (project_id: string, id: string, folder_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/files/${id}/move-folder`, { folder_id });
    dispatch({ type: MOVE_TO_FOLDER, payload: { id: id } });
    dispatch({ type: UPDATE_FOLDER_NUM, payload: { id: folder_id } });
    message.success("This is a success message");
  } catch (err: any) {
    console.log(err);
  }
};

export const getFileDetail = (file: any) => (dispatch: AppDispatch) => {
  try {
    dispatch({ type: FILE_DETAIL, payload: file });
  } catch (err: any) {
    console.log(err);
  }
};

export const setFileLoading = () => {
  return {
    type: FILE_LOADING
  };
};
