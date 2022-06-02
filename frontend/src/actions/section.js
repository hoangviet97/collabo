import { GET_SECTIONS, GET_SECTIONS_FAIL, GET_MODAL_SECTIONS, GET_MODAL_SECTIONS_FAIL, CREATE_SECTION, CREATE_SECTION_FAIL, SECTIONS_LOADING, DELETE_SECTION, DELETE_SECTION_FAIL, RESET_SECTIONS } from "./types";
import axios from "axios";
import { message } from "antd";

export const createSection = ({ project_id, name }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/sections/add`, { name });
    console.log(res.data);
    dispatch({ type: CREATE_SECTION, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SECTION_FAIL });
  }
};

export const getSections = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setSectionLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/sections`);
    dispatch({ type: GET_SECTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SECTIONS_FAIL });
  }
};

export const getModalSections = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sections/all", { id });
    dispatch({ type: GET_MODAL_SECTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MODAL_SECTIONS_FAIL });
  }
};

export const deleteSection = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/sections/${id}`);
    message.success("Section deleted!");
    dispatch({ type: DELETE_SECTION, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_SECTION_FAIL });
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
