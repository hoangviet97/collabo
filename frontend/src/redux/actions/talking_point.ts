import { CREATE_TALKING_POINT, CREATE_TALKING_POINT_FAIL, GET_TALKING_POINTS, GET_TALKING_POINTS_FAIL, UPDATE_CHECK_STATUS } from "./types";
import axiosClient from "../../helpers/axios";
import { AppDispatch } from "../store";

export const createTalkingPoint = (session_id: string, project_id: string, text: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/${session_id}/talking-points/add`, { text });
    dispatch({ type: CREATE_TALKING_POINT, payload: res.data });
  } catch (err: any) {
    dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getTalkingPoints = (session_id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sessions/${session_id}/talking-points`);
    dispatch({ type: GET_TALKING_POINTS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const updateCheckTalkingPoint = (session_id: string, id: string, project_id: string, val: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/sessions/${session_id}/talking-points/${id}/check`, { val });
    dispatch({ type: UPDATE_CHECK_STATUS, payload: { id: id, val: val } });
  } catch (err: any) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};
