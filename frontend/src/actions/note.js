import { CREATE_NOTE, UPDATE_NOTE, GET_NOTE } from "./types";
import axios from "axios";

export const createNote = ({ project_id, session_id, text }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/sessions/${session_id}/notes/add`, { text });
    console.log(res.data);
    dispatch({ type: CREATE_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const getNote = ({ project_id, session_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/sessions/${session_id}/notes`);
    console.log(res.data);
    dispatch({ type: GET_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const updateNote = ({ project_id, session_id, id, text }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/sessions/${session_id}/notes/${id}`, { text });
    dispatch({ type: UPDATE_NOTE, payload: { id, text } });
  } catch (err) {
    console.log("error note");
  }
};
