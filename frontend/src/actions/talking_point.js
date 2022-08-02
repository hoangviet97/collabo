import { CREATE_TALKING_POINT, CREATE_TALKING_POINT_FAIL, GET_TALKING_POINTS, GET_TALKING_POINTS_FAIL, UPDATE_CHECK_STATUS } from "./types";
import axios from "axios";

export const createTalkingPoint = ({ session_id, project_id, text }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/sessions/${session_id}/talking-points/add`, { text });
    console.log(res.data);
    dispatch({ type: CREATE_TALKING_POINT, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getTalkingPoints = ({ session_id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/sessions/${session_id}/talking-points`);
    dispatch({ type: GET_TALKING_POINTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const updateCheckTalkingPoint = ({ session_id, id, project_id, val }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/sessions/${session_id}/talking-points/${id}/check`, { val });
    dispatch({ type: UPDATE_CHECK_STATUS, payload: { id: id, val: val } });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};
