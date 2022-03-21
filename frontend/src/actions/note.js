import { CREATE_NOTE, UPDATE_NOTE, GET_NOTE } from "./types";
import axios from "axios";

export const createNote = ({ session_id, text }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/notes/add", { session_id, text });
    console.log(res.data);
    dispatch({ type: CREATE_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const getNote = ({ session_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/notes/single", { session_id });
    console.log(res.data);
    dispatch({ type: GET_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const updateNote = ({ id, text }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/notes/update", { id, text });
    dispatch({ type: UPDATE_NOTE, payload: { id, text } });
  } catch (err) {
    console.log("error note");
  }
};
