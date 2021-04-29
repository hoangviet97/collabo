import { GET_SECTIONS, GET_SECTIONS_FAIL, GET_MODAL_SECTIONS, GET_MODAL_SECTIONS_FAIL, CREATE_SECTION, CREATE_SECTION_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createSection = ({ id, name }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sections/add", { id, name });
    dispatch({ type: CREATE_SECTION });
    dispatch(getSections({ id }));
    message.success("New section created!");
  } catch (err) {
    dispatch({ type: CREATE_SECTION_FAIL });
  }
};

export const getSections = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sections/all", { id });
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
