import { CREATE_TASK, FILTER_STATUS, FILTER_PRIORITY, CREATE_TASK_FAIL, GET_STATUS_GROUP, DELETE_TASK, SET_BUDGET, SET_PROGRESS, DELETE_TASK_FAIL, GET_ASSIGNEES, DELETE_ASSIGNEES, CREATE_ASSIGNEE, GET_ASSIGNEES_FAIL, GET_PROJECT_TASKS, GET_CALENDAR_TASKS, GET_PROJECT_TASKS_FAIL, TASKS_LOADING, UPDATE_TASK_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_FAIL, UPDATE_TASK_START, UPDATE_TASK_START_FAIL, UPDATE_TASK_END, UPDATE_TASK_END_FAIL, DELETE_ASSIGNEE, GET_PROJECT_AUTH, RESET_AUTH } from "./types";
import axios from "axios";
import { message } from "antd";

export const createTask = ({ project_id, task }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/tasks/add`, { task });
    message.success("New task");
    dispatch({ type: CREATE_TASK, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TASK_FAIL });
  }
};

export const getProjectTasks = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setTasksLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/tasks`);
    dispatch({ type: GET_PROJECT_AUTH });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: RESET_AUTH });
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const getStatusGroup = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setTasksLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/tasks/status-group`);
    dispatch({ type: GET_STATUS_GROUP, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const updateTaskStatus = ({ id, statusId, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/status`, { statusId });
    message.success("Task updated!");
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const setBudget = ({ id, budget, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/budget`, { budget });
    message.success("Task updated!");
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const setProgress = ({ id, progress, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/progress`, { progress });
    dispatch({ type: SET_PROGRESS, payload: { id: id, progress: progress } });
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const setDescription = ({ id, description, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/description`, { description });
    message.success("Task updated!");
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
  }
};

export const updateTaskPriority = ({ id, priorityId, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/priority`, { priorityId });
    dispatch({ type: UPDATE_TASK_PRIORITY, payload: { id, priorityId } });
    message.success("Task updated!");
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTaskStartDate = ({ id, date, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/start`, { date });
    dispatch({ type: UPDATE_TASK_START, payload: { id, date } });
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
  }
};

export const updateTaskEndDate = ({ id, date, project_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/tasks/${id}/update-end`, { date });
    dispatch({ type: UPDATE_TASK_END, payload: { id, date } });
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
  }
};

export const getAllAssignees = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/tasks/assignees`);
    dispatch({ type: GET_ASSIGNEES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
  }
};

export const createAssignee = ({ user_id, task_id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/tasks/${task_id}/assignees/${user_id}`);
    console.log(res);
    dispatch({ type: CREATE_ASSIGNEE, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
  }
};

export const deleteAssignee = ({ user_id, task_id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/tasks/${task_id}/assignees/${user_id}`);
    dispatch({ type: DELETE_ASSIGNEE, payload: { user_id, task_id } });
  } catch (err) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
  }
};

export const deleteTask = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/tasks/:id/delete`);
    console.log(res);
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

export const filterTaskByStatus = (status) => {
  return {
    type: FILTER_STATUS,
    payload: status
  };
};

export const filterTaskByPriority = (priority) => {
  return {
    type: FILTER_PRIORITY,
    payload: priority
  };
};
