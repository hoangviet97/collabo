import { CREATE_TAG, GET_TAGS, CREATE_TASK_TAG, DELETE_TAGS, GET_TASK_TAGS, DELETE_TASK_TAG, GET_TALKING_POINTS_FAIL, CREATE_TALKING_POINT_FAIL, TAGS_LOADING, RESET_TAGS } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";

export const createTag = (project_id: string, name: string, color: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/tags/add`, { name, color });
    dispatch({ type: CREATE_TAG, payload: res.data });
  } catch (err: any) {
    dispatch({ type: CREATE_TALKING_POINT_FAIL });
    message.error(err.response.data.message);
  }
};

export const createTaskTag = (project_id: string, task: string, tag: string, name: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/tags/task-tag`, { task, tag, name });
    dispatch({ type: CREATE_TASK_TAG, payload: { task, tag, name } });
  } catch (err: any) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
    message.error("Error!");
  }
};

export const getTags = (project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setTagsLoading());
    const res = await axiosClient.get(`/${project_id}/tags`);
    dispatch({ type: GET_TAGS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const getTagsByTasks = (project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/tags/tasks`);
    dispatch({ type: GET_TASK_TAGS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const deleteTag = (project_id: string, id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/tags/${id}`);
    dispatch({ type: DELETE_TAGS, payload: id });
  } catch (err: any) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
    message.error(err.response.data.message);
  }
};

export const deleteTaskTag = (project_id: string, tag: string, task: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/tasks/${task}/tags/${tag}`);
    dispatch({ type: DELETE_TASK_TAG, payload: { tag, task } });
    console.log(res);
  } catch (err: any) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
    message.error(err.response.data.message);
  }
};

export const resetTags = () => {
  return {
    type: RESET_TAGS
  };
};

export const setTags = () => {
  return {
    type: TAGS_LOADING
  };
};

export const setTagsLoading = () => {
  return {
    type: TAGS_LOADING
  };
};
