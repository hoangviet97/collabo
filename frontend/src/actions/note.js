import { CREATE_NOTE, UPDATE_NOTE, GET_NOTE } from "./types";
import axiosClient from "../helpers/axios";

export const createNote = ({ project_id, session_id, text }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/${session_id}/notes/add`, { text });
    dispatch({ type: CREATE_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const getNote = ({ project_id, session_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sessions/${session_id}/notes`);
    dispatch({ type: GET_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const updateNote = ({ project_id, session_id, id, text }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/sessions/${session_id}/notes/${id}`, { text });
    dispatch({ type: UPDATE_NOTE, payload: { id, text } });
  } catch (err) {
    console.log("error note");
  }
};
