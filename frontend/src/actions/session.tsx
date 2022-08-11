import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_PARTICIPANTS, GET_SESSIONS, GET_SESSIONS_FAIL, GET_SESSION, DELETE_SESSION, GET_SESSION_FAIL, SESSIONS_LOADING, SESSION_LOADING } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createSession = (session: any, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/add`, { session });
    dispatch({ type: CREATE_SESSION, payload: res.data });
    message.success("Session created!");
  } catch (err) {
    dispatch({ type: CREATE_SESSION_FAIL });
  }
};

export const getSessions = (project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setSessionsLoading());
    const res = await axiosClient.get(`/${project_id}/sessions`);
    dispatch({ type: GET_SESSIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSIONS_FAIL });
  }
};

export const getSession = (id: string, project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setSessionLoading());
    const res = await axiosClient.get(`/${project_id}/sessions/${id}`);
    dispatch({ type: GET_SESSION, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const deleteSession = (id: string, project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setSessionLoading());
    const res = await axiosClient.delete(`/${project_id}/sessions/${id}`);
    dispatch({ type: DELETE_SESSION, payload: id });
    message.success("Session deleted!");
  } catch (err) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const getParticipants = (id: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sessions/${id}/participants`);

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
