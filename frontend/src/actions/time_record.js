import { CREATE_TIME_RECORD, CREATE_TIME_RECORD_FAIL, GET_TIME_RECORDS, GET_TIME_RECORDS_FAIL } from "./types";
import axios from "axios";

export const createTimeRecord = ({ start, end, task_id, total }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/timers/add", { start, end, task_id, total });
    dispatch({ type: CREATE_TIME_RECORD, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TIME_RECORD_FAIL });
  }
};

export const getTimeRecords = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:9000/api/timers/all-personal");
    dispatch({ type: GET_TIME_RECORDS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TIME_RECORDS_FAIL });
  }
};
