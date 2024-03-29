import { GET_SECTIONS, GET_SECTIONS_FAIL, GET_MODAL_SECTIONS, GET_MODAL_SECTIONS_FAIL, CREATE_SECTION, CREATE_SECTION_FAIL, SECTIONS_LOADING, DELETE_SECTION, DELETE_SECTION_FAIL, RESET_SECTIONS } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";
import { AppDispatch } from "../store";

export const createSection = (project_id: string, name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSectionLoading());
    const res = await axiosClient.post(`/${project_id}/sections/add`, { name });
    dispatch({ type: CREATE_SECTION, payload: { id: res.data.id, name: res.data.name } });
  } catch (err: any) {
    dispatch({ type: CREATE_SECTION_FAIL });
    message.error(err.response.data.message);
  }
};

export const getSections = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSectionLoading());
    const res = await axiosClient.get(`/${project_id}/sections`);
    dispatch({ type: GET_SECTIONS, payload: res.data });
    console.log(process.env.REACT_APP_TODO);
  } catch (err: any) {
    dispatch({ type: GET_SECTIONS_FAIL });
  }
};

export const getModalSections = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sections`);
    dispatch({ type: GET_MODAL_SECTIONS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_MODAL_SECTIONS_FAIL });
  }
};

export const deleteSection = (project_id: string, id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/sections/${id}`);
    message.success("Section deleted!");
    dispatch({ type: DELETE_SECTION, payload: id });
  } catch (err: any) {
    dispatch({ type: DELETE_SECTION_FAIL });
    message.error(err.response.data.message);
  }
};

export const resetSections = () => {
  return { type: RESET_SECTIONS };
};

export const setSectionLoading = () => {
  return {
    type: SECTIONS_LOADING
  };
};
