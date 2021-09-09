import { GET_FILES, GET_INVITATIONS_FAIL, MOVE_TO_FOLDER } from "./types";
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

export const moveToFolder = ({ id, folder_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/files/move-folder", { id, folder_id });
    dispatch({ type: MOVE_TO_FOLDER, payload: { id: id, folder_id: folder_id } });
    message.success("This is a success message");
  } catch (err) {
    console.log(err);
  }
};
