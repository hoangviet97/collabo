import { GET_LOGS } from "./types";
import axiosClient from "../helpers/axios";

export const getLogs = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/logs`);
    dispatch({ type: GET_LOGS, payload: res.data });
  } catch (err) {
    console.log(err);
    //dispatch({ type: GET_MEMBERS_FAIL });
  }
};
