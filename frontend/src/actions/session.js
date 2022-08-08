import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_PARTICIPANTS, GET_SESSIONS, GET_SESSIONS_FAIL, GET_SESSION, DELETE_SESSION, GET_SESSION_FAIL, SESSIONS_LOADING, SESSION_LOADING, ACTIVE_SESSIONS, TODAY_SESSIONS, PAST_SESSIONS } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createSession = ({ session, project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/add`, { session });
    dispatch({ type: CREATE_SESSION, payload: res.data });
    message.success("Session created!");
  } catch (err) {
    dispatch({ type: CREATE_SESSION_FAIL });
  }
};

export const getSessions = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionsLoading());
    const res = await axiosClient.get(`/${project_id}/sessions`);
    dispatch({ type: GET_SESSIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSIONS_FAIL });
  }
};

export const getSession = ({ id, project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axiosClient.get(`/${project_id}/sessions/${id}`);
    dispatch({ type: GET_SESSION, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const deleteSession = ({ id, project_id }) => async (dispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axiosClient.delete(`/${project_id}/sessions/${id}`);
    dispatch({ type: DELETE_SESSION, payload: id });
    message.success("Session deleted!");
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const getParticipants = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sessions/${id}/participants`);

    dispatch({ type: GET_PARTICIPANTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const filterActiveSessions = () => {
  return {
    type: ACTIVE_SESSIONS
  };
};

export const filterTodaySessions = () => {
  return {
    type: TODAY_SESSIONS
  };
};

export const filterPastSessions = (today) => {
  return {
    type: PAST_SESSIONS,
    payload: today
  };
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
