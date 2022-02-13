import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_PARTICIPANTS, GET_SESSIONS, GET_SESSIONS_FAIL, GET_SESSION, GET_SESSION_FAIL, DATA_LOADING, UPDATE_NOTE } from "./types";
import axios from "axios";
import { message } from "antd";

export const createSession = ({ session, project }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sessions/add", { session, project });
    dispatch({ type: CREATE_SESSION, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SESSION_FAIL });
  }
};

export const getSessions = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axios.post("http://localhost:9000/api/sessions/all", { project_id });
    dispatch({ type: GET_SESSIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSIONS_FAIL });
  }
};

export const getSession = ({ id }) => async (dispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axios.post("http://localhost:9000/api/sessions/single", { id });
    //dispatch({ type: GET_SESSION, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const getParticipants = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sessions/participants", { id });
    dispatch({ type: GET_PARTICIPANTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const setSessionLoading = () => {
  return {
    type: DATA_LOADING
  };
};
