import { CREATE_PROJECT, CREATE_PROJECT_FAIL, GET_PROJECTS, LOAD_PROJECTS_FAIL, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING } from "./types";
import axios from "axios";
import { message } from "antd";
import setAuthToken from "../helpers/setAuthToken";

export const createProject = ({ name, push }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/projects/add", { name });
    dispatch({ type: CREATE_PROJECT });
    push(`/${res.data}/tasks`);
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
    dispatch({ type: ERROR_SINGLE_PROJECT });
  }
};

export const setProjectLoading = () => {
  return {
    type: PROJECT_LOADING
  };
};
