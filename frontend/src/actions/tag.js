import { CREATE_TAG, GET_TAGS, CREATE_TASK_TAG, DELETE_TAGS, GET_TASK_TAGS, GET_TALKING_POINTS_FAIL, CREATE_TALKING_POINT_FAIL, TAGS_LOADING } from "./types";
import axiosClient from "../helpers/axios";

export const createTag = ({ project_id, name, color }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/tags/add`, { name, color });
    console.log(res.data);
    dispatch({ type: CREATE_TAG, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const createTaskTag = ({ project_id, task, tag }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/tags/task-tag`, { task, tag });
    dispatch({ type: CREATE_TASK_TAG, payload: { task, tag } });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const getTags = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setTagsLoading());
    const res = await axiosClient.get(`/${project_id}/tags`);
    dispatch({ type: GET_TAGS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const getTagsByTasks = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/tags/tasks`);
    dispatch({ type: GET_TASK_TAGS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const deleteTag = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/tags/${id}`);
    dispatch({ type: DELETE_TAGS, payload: id });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const setTagsLoading = () => {
  return {
    type: TAGS_LOADING
  };
};
