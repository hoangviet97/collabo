import { CREATE_TAG, GET_TAGS, DELETE_TAGS, GET_TASK_TAGS, GET_TALKING_POINTS_FAIL, CREATE_TALKING_POINT_FAIL, TAGS_LOADING } from "./types";
import axios from "axios";

export const createTag = ({ project, name, color }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tags/add", { project, name, color });
    console.log(res.data);
    dispatch({ type: CREATE_TAG, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getTags = ({ project }) => async (dispatch) => {
  try {
    dispatch(setTagsLoading());
    const res = await axios.post("http://localhost:9000/api/tags/all", { project });
    dispatch({ type: GET_TAGS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const getTagsByTasks = ({ project }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tags/tasks", { project });
    dispatch({ type: GET_TASK_TAGS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TALKING_POINTS_FAIL });
  }
};

export const deleteTag = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/tags/delete", { id });
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
