import { CREATE_TASK, CREATE_TASK_FAIL, DELETE_TASK, DELETE_TASK_FAIL, GET_ASSIGNEES, GET_ASSIGNEES_FAIL, GET_PROJECT_TASKS, GET_PROJECT_TASKS_FAIL, TASKS_LOADING, UPDATE_TASK_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_FAIL, UPDATE_TASK_START, UPDATE_TASK_START_FAIL, UPDATE_TASK_END, UPDATE_TASK_END_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createTask = ({ task, projectId }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tasks/add", task);
    message.success("New task");
    dispatch({ type: CREATE_TASK });

    if (projectId.length === 8 && isNaN(projectId) === false) {
      dispatch(getAllAssignees({ id: projectId }));
      dispatch(getProjectTasks({ id: projectId }));
    }
  } catch (err) {
    dispatch({ type: CREATE_TASK_FAIL });
  }
};

export const getProjectTasks = ({ id }) => async (dispatch) => {
  try {
    dispatch(setTasksLoading());
    const res = await axios.post("http://localhost:9000/api/tasks/all", { id });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const getPersonalTasks = ({ id }) => async (dispatch) => {
  try {
    dispatch(setTasksLoading());
    const res = await axios.post("http://localhost:9000/api/tasks/personal", { id });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
    console.log(res);
  } catch (err) {
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const updateTaskStatus = ({ id, statusId, project }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/tasks/update-status", { id, statusId, project });
    dispatch({ type: UPDATE_TASK_STATUS, payload: { id, statusId } });
    message.success("Task updated!");
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTaskPriority = ({ id, priorityId, project }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/tasks/update-priority", { id, priorityId, project });
    dispatch({ type: UPDATE_TASK_PRIORITY, payload: { id, priorityId } });
    message.success("Task updated!");
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTaskStartDate = ({ id, date }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/tasks/update-start", { id, date });
    dispatch({ type: UPDATE_TASK_START, payload: { id, date } });
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
  }
};

export const updateTaskEndDate = ({ id, date }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/tasks/update-end", { id, date });
    dispatch({ type: UPDATE_TASK_END, payload: { id, date } });
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
  }
};

export const getAllAssignees = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tasks/assignees", { id });
    dispatch({ type: GET_ASSIGNEES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
  }
};

export const deleteTask = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tasks/delete", { id });
    dispatch({ type: DELETE_TASK, payload: id });
    message.success("Task deleted!");
  } catch (err) {
    dispatch({ type: DELETE_TASK_FAIL });
  }
};

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  };
};
