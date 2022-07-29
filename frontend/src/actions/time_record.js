import { CREATE_TIME_RECORD, TIME_RECORD_SUM, CREATE_TIME_RECORD_FAIL, GET_TIME_RECORDS, GET_TIME_RECORDS_BY_USER, GET_TIME_RECORDS_FAIL } from "./types";
import axios from "axios";

export const createTimeRecord = ({ start, end, task_id, total, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/times/add`, { start: start, end: end, task_id: task_id, total: total });
    dispatch({ type: CREATE_TIME_RECORD, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TIME_RECORD_FAIL });
  }
};

export const getTimeRecords = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/times/personal`);
    dispatch({ type: GET_TIME_RECORDS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};

export const getMemberRecords = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/times/${id}`);
    dispatch({ type: GET_TIME_RECORDS_BY_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};

export const getTimeRecordsSum = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/times/sum`);
    dispatch({ type: TIME_RECORD_SUM, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};
