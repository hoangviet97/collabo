import { CREATE_TALKING_POINT, CREATE_TALKING_POINT_FAIL, GET_TALKING_POINTS, GET_TALKING_POINTS_FAIL } from "./types";
import axios from "axios";

export const createTalkingPoint = ({ session_id, text }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/talking-points/add", { session_id, text });
    console.log(res.data);
    dispatch({ type: CREATE_TALKING_POINT, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getTalkingPoints = ({ session_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/talking-points/all", { session_id });
    dispatch({ type: GET_TALKING_POINTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};
