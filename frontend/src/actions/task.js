import { CREATE_TASK, CREATE_TASK_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createTask = ({ task }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tasks/add", task);
    message.success("New task");
    dispatch({ type: CREATE_TASK });
  } catch (err) {
    dispatch({ type: CREATE_TASK_FAIL });
  }
};
