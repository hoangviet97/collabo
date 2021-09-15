import { CREATE_PROJECT, CREATE_PROJECT_FAIL, GET_PROJECTS, LOAD_PROJECTS_FAIL, UPDATE_PROJECT_COLOR, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING, SET_FAVORITE_PROJECT, SET_FAVORITE_PROJECT_FAIL, UPDATE_PROJECT_STATUS, UPDATE_PROJECT_STATUS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";
import setAuthToken from "../helpers/setAuthToken";

export const createProject = ({ name, push }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/projects/add", { name });
    console.log(res.data);
    dispatch({ type: CREATE_PROJECT, payload: res.data });
    push(`/${res.data.id}/tasks`);
    message.success("Project " + name + " was successfully created");
  } catch (err) {
    dispatch({ type: CREATE_PROJECT_FAIL });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axios.get("http://localhost:9000/api/projects");
    dispatch({ type: GET_PROJECTS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAD_PROJECTS_FAIL });
  }
};

export const getProject = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axios.post("http://localhost:9000/api/projects/single", { id: id });
    dispatch({ type: GET_SINGLE_PROJECT, payload: res.data[0] });
  } catch (err) {
    console.log(err);
    //dispatch({ type: ERROR_SINGLE_PROJECT });
  }
};

export const setFavorite = ({ id, status }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/projects/favorite", { status: status, projectId: id });
    dispatch({ type: SET_FAVORITE_PROJECT, payload: { id: id, status: status } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const updateColor = ({ id, color, project }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/projects/color", { id: id, color: color, project: project });
    dispatch({ type: UPDATE_PROJECT_COLOR, payload: { color: color } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const updateStatus = ({ id, status, project }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/projects/status", { id: id, status: status, project: project });
    dispatch({ type: UPDATE_PROJECT_STATUS, payload: { status: status } });
    message.success("Status updated");
  } catch (err) {
    dispatch({ type: UPDATE_PROJECT_STATUS_FAIL });
  }
};

export const setProjectLoading = () => {
  return {
    type: PROJECT_LOADING
  };
};
