import { GET_FILES, GET_INVITATIONS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const getAllFiles = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/files/all", { project_id });
    dispatch({ type: GET_FILES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
