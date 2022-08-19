import { CREATE_TASK, FILTER_STATUS, FILTER_PRIORITY, CREATE_TASK_FAIL, GET_TASK, GET_STATUS_GROUP, DELETE_TASK, SET_BUDGET, SET_PROGRESS, DELETE_TASK_FAIL, GET_ASSIGNEES, CREATE_ASSIGNEE, GET_ASSIGNEES_FAIL, GET_PROJECT_TASKS, UPDATE_TASK_TITLE, GET_PROJECT_TASKS_FAIL, TASKS_LOADING, UPDATE_TASK_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_FAIL, UPDATE_TASK_START, UPDATE_TASK_START_FAIL, UPDATE_TASK_END, RESET_TASKS, DELETE_ASSIGNEE, GET_PROJECT_AUTH, RESET_AUTH, GET_EXPENSES, GET_ASSIGNEE_TASKS, GET_PERSONAL_TASKS } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createTask = (project_id: string, task: any) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/tasks/add`, { task });
    message.success("New task created!");
    dispatch({ type: CREATE_TASK, payload: res.data });
  } catch (err: any) {
    dispatch({ type: CREATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const getTask = (project_id: string, task: any) => async (dispatch: any) => {
  try {
    dispatch(setTasksLoading());
    const res = await axiosClient.get(`/${project_id}/tasks/${task}`);
    dispatch({ type: GET_TASK, payload: res.data[0] });
    console.log(res.data[0]);
  } catch (err: any) {
    //dispatch({ type: CREATE_TASK_FAIL });
    //message.error(err.response.data.message);
  }
};

export const getProjectTasks = (project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setTasksLoading());
    const res = await axiosClient.get(`/${project_id}/tasks`);
    dispatch({ type: GET_PROJECT_AUTH });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
    console.log(res);
  } catch (err) {
    dispatch({ type: RESET_AUTH });
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const getPersonalTasks = (project_id: string, id: string) => async (dispatch: any) => {
  try {
    dispatch(setTasksLoading());
    const res = await axiosClient.get(`/${project_id}/members/${id}/tasks`);
    dispatch({ type: GET_PROJECT_AUTH });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
  } catch (err) {
    dispatch({ type: RESET_AUTH });
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const getUserTasks = (project_id: string, id: string) => async (dispatch: any) => {
  try {
    dispatch(setTasksLoading());
    const res = await axiosClient.get(`/${project_id}/users/${id}/tasks`);
    dispatch({ type: GET_PROJECT_AUTH });
    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
  } catch (err) {
    dispatch({ type: RESET_AUTH });
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
  }
};

export const getStatusGroup = (project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setTasksLoading());
    const res = await axiosClient.get(`/${project_id}/tasks`);
    dispatch({ type: GET_STATUS_GROUP, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROJECT_TASKS_FAIL });
    message.error("Something went wrong!");
  }
};

export const updateTaskStatus = (id: string, statusId: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/status`, { statusId });
    dispatch({ type: UPDATE_TASK_STATUS, payload: { id: id, status: statusId } });
    message.success("Task updated!");
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const setBudget = (id: string, budget: number, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/budget`, { budget });
    message.success("Task updated!");
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const setProgress = (id: string, progress: number, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/progress`, { progress });
    dispatch({ type: SET_PROGRESS, payload: { id: id, progress: progress } });
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const setDescription = (id: string, description: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/description`, { description });
    message.success("Task updated!");
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTaskPriority = (id: string, priorityId: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/priority`, { priorityId });
    dispatch({ type: UPDATE_TASK_PRIORITY, payload: { id, priorityId } });
    message.success("Task updated!");
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTitle = (id: string, title: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/title`, { title });
    dispatch({ type: UPDATE_TASK_TITLE, payload: { id, title } });
    message.success("Task updated!");
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTaskStartDate = (id: string, date: any, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/start`, { date });
    dispatch({ type: UPDATE_TASK_START, payload: { id, date } });
  } catch (err: any) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const updateTaskEndDate = (id: string, date: any, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/tasks/${id}/end`, { date });
    dispatch({ type: UPDATE_TASK_END, payload: { id, date } });
  } catch (err) {
    dispatch({ type: UPDATE_TASK_FAIL });
    message.error("Something went wrong!");
  }
};

export const getAllAssignees = (project_id: string) => async (dispatch: any) => {
  console.log(project_id);
  try {
    const res = await axiosClient.get(`/${project_id}/tasks/assignees`);
    dispatch({ type: GET_ASSIGNEES, payload: res.data });
    console.log(res);
  } catch (err) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
  }
};

export const getAssigneeTasks = (project_id: string, id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/tasks/assignees/${id}`);
    dispatch({ type: GET_ASSIGNEE_TASKS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
  }
};

export const createAssignee = (user_id: string, task_id: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/tasks/${task_id}/assignees/${user_id}`);
    console.log(res);
    dispatch({ type: CREATE_ASSIGNEE, payload: res.data[0] });
  } catch (err: any) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
    message.error(err.response.data.message);
  }
};

export const deleteAssignee = (user_id: string, task_id: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/tasks/${task_id}/assignees/${user_id}`);
    dispatch({ type: DELETE_ASSIGNEE, payload: { user_id, task_id } });
  } catch (err: any) {
    dispatch({ type: GET_ASSIGNEES_FAIL });
    message.error(err.response.data.message);
  }
};

export const deleteTask = (id: string, project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/tasks/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
    message.success("Task deleted!");
  } catch (err: any) {
    dispatch({ type: DELETE_TASK_FAIL });
    message.error(err.response.data.message);
  }
};

export const getExpenses = (project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/tasks`);
    dispatch({ type: GET_EXPENSES, payload: res.data });
  } catch (err) {
    dispatch({ type: DELETE_TASK_FAIL });
    message.error("Something went wrong!");
  }
};

export const resetTasks = () => {
  return {
    type: RESET_TASKS
  };
};

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  };
};

export const filterTaskByStatus = (status: string) => {
  return {
    type: FILTER_STATUS,
    payload: status
  };
};

export const filterTaskByPriority = (priority: string) => {
  return {
    type: FILTER_PRIORITY,
    payload: priority
  };
};
