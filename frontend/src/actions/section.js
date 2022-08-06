import { GET_SECTIONS, GET_SECTIONS_FAIL, GET_MODAL_SECTIONS, GET_MODAL_SECTIONS_FAIL, CREATE_SECTION, CREATE_SECTION_FAIL, SECTIONS_LOADING, DELETE_SECTION, DELETE_SECTION_FAIL, RESET_SECTIONS } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createSection = ({ project_id, name }) => async (dispatch) => {
  try {
    dispatch(setSectionLoading());
    const res = await axiosClient.post(`/${project_id}/sections/add`, { name });
    dispatch({ type: CREATE_SECTION, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SECTION_FAIL });
    message.error(err.response.data.message);
  }
};

export const getSections = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setSectionLoading());
    const res = await axiosClient.get(`/${project_id}/sections`);
    dispatch({ type: GET_SECTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SECTIONS_FAIL });
  }
};

export const getModalSections = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sections`);
    dispatch({ type: GET_MODAL_SECTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MODAL_SECTIONS_FAIL });
  }
};

export const deleteSection = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/sections/${id}`);
    message.success("Section deleted!");
    dispatch({ type: DELETE_SECTION, payload: id });
  } catch (err) {
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
