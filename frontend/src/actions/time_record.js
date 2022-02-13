import { CREATE_TIME_RECORD, CREATE_TIME_RECORD_FAIL, GET_TIME_RECORDS, GET_TIME_RECORDS_FAIL } from "./types";
import axios from "axios";

export const createTimeRecord = ({ start, end, task_id, total, project_id }) => async (dispatch) => {
  console.log(`,,,,,, ${project_id}`);
  try {
    const res = await axios.post("http://localhost:9000/api/timers/add", { start: start, end: end, task_id: task_id, total: total, project_id: project_id });
    dispatch({ type: CREATE_TIME_RECORD, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TIME_RECORD_FAIL });
  }
};

export const getTimeRecords = ({ project_id }) => async (dispatch) => {
  try {
    console.log(`,,,,,, ${project_id}`);
    const res = await axios.post("http://localhost:9000/api/timers/all-personal", { project_id: project_id });
    dispatch({ type: GET_TIME_RECORDS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};
