import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_SESSIONS, GET_SESSIONS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createSession = ({ session }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sessions/add", { session });
    console.log(res.data);
    dispatch({ type: CREATE_SESSION, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SESSION_FAIL });
  }
};

export const getSessions = ({ project_id }) => async (dispatch) => {
  try {
    //dispatch(setSectionLoading());
    const res = await axios.post("http://localhost:9000/api/sessions/all", { project_id });
    dispatch({ type: GET_SESSIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SESSIONS_FAIL });
  }
};
