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

export const getProject = ({ project_id, push }) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axios.get(`http://localhost:9000/api/projects/${project_id}`);
    dispatch({ type: GET_SINGLE_PROJECT, payload: res.data[0] });
  } catch (err) {
    push("/");
    //dispatch({ type: ERROR_SINGLE_PROJECT });
  }
};

export const setFavorite = ({ project_id, status }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/projects/${project_id}/favorite`, { status: status });
    dispatch({ type: SET_FAVORITE_PROJECT, payload: { id: project_id, status: status } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const setBudget = ({ project_id, budget }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/projects/${project_id}/budget`, { budget: budget });
    dispatch({ type: SET_PROJECT_BUDGET, payload: { id: project_id, budget: budget } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const setCurrency = ({ project_id, currency }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/projects/${project_id}/currency`, { currency: currency });
    dispatch({ type: SET_PROJECT_CURRENCY, payload: { id: project_id, budget: currency } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const deleteProject = ({ project_id, push }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/projects/${project_id}`);
    dispatch({ type: LEAVE_PROJECT, payload: project_id });
    push(`/`);
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const updateColor = ({ project_id, color }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/projects/${project_id}/color`, { color: color });
    dispatch({ type: UPDATE_PROJECT_COLOR, payload: { color: color } });
  } catch (err) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const updateStatus = ({ project_id, status }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/projects/${project_id}/status`, { status: status });
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
