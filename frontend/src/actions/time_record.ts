import { CREATE_TIME_RECORD, TIME_RECORD_SUM, CREATE_TIME_RECORD_FAIL, GET_TIME_RECORDS, GET_TIME_RECORDS_BY_USER, GET_TIME_RECORDS_FAIL } from "./types";
import axiosClient from "../helpers/axios";

export const createTimeRecord = (start: any, end: any, task_id: string, total: number, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/times/add`, { start: start, end: end, task_id: task_id, total: total });
    dispatch({ type: CREATE_TIME_RECORD, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TIME_RECORD_FAIL });
  }
};

export const getTimeRecords = (project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/times/personal`);
    dispatch({ type: GET_TIME_RECORDS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};

export const getMemberRecords = (project_id: string, id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/times/${id}`);
    dispatch({ type: GET_TIME_RECORDS_BY_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};

export const getTimeRecordsSum = (project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/times/sum`);
    dispatch({ type: TIME_RECORD_SUM, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};
