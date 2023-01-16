import { GET_LOGS, GET_UNSEEN_LOGS, UPDATE_UNSEEN_LOGS } from "./types";
import axiosClient from "../../helpers/axios";
import { AppDispatch } from "../store";

export const getLogs = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/logs`);
    dispatch({ type: GET_LOGS, payload: res.data });
    return res;
  } catch (err) {
    //dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const getUnseenLogs = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/logs`);
    dispatch({ type: GET_UNSEEN_LOGS, payload: res.data });
  } catch (err) {
    //dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const updateUnseenLogs = (project_id: string, logs: string[]) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/logs/seen`, { logs });
    dispatch({ type: UPDATE_UNSEEN_LOGS, payload: res.data });
  } catch (err) {
    //dispatch({ type: GET_MEMBERS_FAIL });
  }
};
