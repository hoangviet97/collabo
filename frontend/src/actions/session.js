import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_PARTICIPANTS, GET_SESSIONS, GET_SESSIONS_FAIL, GET_SESSION, DELETE_SESSION, GET_SESSION_FAIL, SESSIONS_LOADING, SESSION_LOADING } from "./types";
import axios from "axios";
import { message } from "antd";

export const createSession = ({ session, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/sessions/add`, { session });
    dispatch({ type: CREATE_SESSION, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SESSION_FAIL });
  }
};

export const getSessions = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionsLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/sessions`);
    dispatch({ type: GET_SESSIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSIONS_FAIL });
  }
};

export const getSession = ({ id, project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/sessions/${id}`);
    dispatch({ type: GET_SESSION, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const deleteSession = ({ id, project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/sessions/${id}`);
    dispatch({ type: DELETE_SESSION, payload: id });
    message.success("Session deleted!");
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const getParticipants = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/sessions/${id}/participants`);

    console.log(res.data);
    dispatch({ type: GET_PARTICIPANTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const setSessionLoading = () => {
  return {
    type: SESSION_LOADING
  };
};

export const setSessionsLoading = () => {
  return {
    type: SESSIONS_LOADING
  };
};
