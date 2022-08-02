import { GET_LOGS } from "./types";
import axios from "axios";

export const getLogs = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/logs`);
    dispatch({ type: GET_LOGS, payload: res.data });
  } catch (err) {
    //dispatch({ type: GET_MEMBERS_FAIL });
  }
};
