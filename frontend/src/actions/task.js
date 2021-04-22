import { CREATE_TASK, CREATE_TASK_FAIL, GET_PROJECT_TASKS, GET_PROJECT_TASKS_FAIL } from "./types";
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

export const getProjectTasks = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tasks/all", { id });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};
