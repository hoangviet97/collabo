import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_PARTICIPANTS, GET_SESSIONS, ADD_PARTICIPANT, DELETE_PARTICIPANT, GET_SESSIONS_FAIL, GET_SESSION, DELETE_SESSION, GET_SESSION_FAIL, SESSIONS_LOADING, SESSION_LOADING } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";
import { AppDispatch } from "../store";

export const createSession = (session: any, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/add`, { session });
    dispatch({ type: CREATE_SESSION, payload: res.data });
    message.success("Session created!");
  } catch (err: any) {
    dispatch({ type: CREATE_SESSION_FAIL });
    message.error(err.response.data.message);
  }
};

export const getSessions = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSessionsLoading());
    const res = await axiosClient.get(`/${project_id}/sessions`);
    dispatch({ type: GET_SESSIONS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_SESSIONS_FAIL });
  }
};

export const getSession = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axiosClient.get(`/${project_id}/sessions/${id}`);
    dispatch({ type: GET_SESSION, payload: res.data[0] });
  } catch (err: any) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const deleteSession = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSessionLoading());
    const res = await axiosClient.delete(`/${project_id}/sessions/${id}`);
    dispatch({ type: DELETE_SESSION, payload: id });
    message.success("Session deleted!");
  } catch (err: any) {
    dispatch({ type: GET_SESSION_FAIL });
    message.error(err.response.data.message);
  }
};

export const deleteParticipant = (user_id: string, session_id: string, project_id: string, email: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/sessions/${session_id}/participants/${user_id}`);
    dispatch({ type: DELETE_PARTICIPANT, payload: email });
  } catch (err: any) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const addParticipant = (user_id: string, session_id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/${session_id}/participants/${user_id}`);
    dispatch({ type: ADD_PARTICIPANT, payload: res.data[0] });
    console.log(res.data[0]);
  } catch (err: any) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};

export const getParticipants = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sessions/${id}/participants`);

    dispatch({ type: GET_PARTICIPANTS, payload: res.data });
  } catch (err: any) {
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
