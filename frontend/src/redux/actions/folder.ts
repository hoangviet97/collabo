import { CREATE_FOLDER, CREATE_FOLDER_FAIL, GET_FOLDERS, GET_FOLDER, GET_FOLDERS_FAIL, DELETE_FOLDER, FOLDER_LOADING } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";
import { AppDispatch } from "../store";

export const createFolder = (title: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/folders/add`, { title });
    dispatch({ type: CREATE_FOLDER, payload: res.data });
    console.log(res.data);
  } catch (err: any) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const getFolder = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/folders/${id}`);
    dispatch({ type: GET_FOLDER, payload: res.data[0] });
    console.log(res.data[0]);
  } catch (err: any) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const getAllFolders = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const res = await axiosClient.get(`/${project_id}/folders`);
    dispatch({ type: GET_FOLDERS, payload: res.data });
    console.log(res.data);
  } catch (err: any) {
    dispatch({ type: GET_FOLDERS_FAIL });
  }
};

export const deleteFolder = (project_id: string, folder_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/folders/${folder_id}`);
    dispatch({ type: DELETE_FOLDER, payload: folder_id });
    message.success("Folder deleted");
  } catch (err: any) {
    dispatch({ type: GET_FOLDERS_FAIL });
    message.error(err.response.data.message);
  }
};

export const setLoading = () => {
  return {
    type: FOLDER_LOADING
  };
};
