import { CREATE_PROJECT, CREATE_PROJECT_FAIL, RESET_AUTH, GET_PROJECT_AUTH, SET_PROJECT_CURRENCY, SET_PROJECT_BUDGET, LEAVE_PROJECT, GET_PROJECTS, LOAD_PROJECTS_FAIL, UPDATE_PROJECT_COLOR, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING, SET_FAVORITE_PROJECT, SET_FAVORITE_PROJECT_FAIL, UPDATE_PROJECT_STATUS, UPDATE_PROJECT_STATUS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";
import setAuthToken from "../helpers/setAuthToken";

export const createProject = ({ name, color, push }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/projects/add", { name, color });
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

export const getProject = ({ project, push }) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axios.post("http://localhost:9000/api/projects/single", { project });
    dispatch({ type: GET_SINGLE_PROJECT, payload: res.data[0] });
  } catch (err) {
    console.log(err.response.status);
    dispatch({ type: GET_PROJECT_AUTH });
    push("/");
    //dispatch({ type: ERROR_SINGLE_PROJECT });
  }
};

export const goToProject = ({ project, pusher }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/projects/check", { project });
    console.log(res);
  } catch (err) {
    console.log(err.response);
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

export const setBudget = ({ projectId, budget }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/projects/budget", { budget: budget, project: projectId });
    dispatch({ type: SET_PROJECT_BUDGET, payload: { id: projectId, budget: budget } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const setCurrency = ({ projectId, currency }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/projects/currency", { currency: currency, project: projectId });
    dispatch({ type: SET_PROJECT_CURRENCY, payload: { id: projectId, budget: currency } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const deleteProject = ({ id, push }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/projects/delete", { id, project: id });
    dispatch({ type: LEAVE_PROJECT, payload: id });
    push(`/`);
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

export const resetAuth = () => {
  return {
    type: RESET_AUTH
  };
};
