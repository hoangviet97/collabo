import { CREATE_PROJECT, CREATE_PROJECT_FAIL, RESET_AUTH, RESET_SINGLE_PROJECT, SET_PROJECT_CURRENCY, SET_PROJECT_BUDGET, LEAVE_PROJECT, GET_PROJECTS, LOAD_PROJECTS_FAIL, UPDATE_PROJECT_COLOR, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING, SET_FAVORITE_PROJECT, SET_FAVORITE_PROJECT_FAIL, UPDATE_PROJECT_STATUS, UPDATE_PROJECT_STATUS_FAIL, GET_MODAL_PROJECTS } from "./types";
import { message } from "antd";
import setAuthToken from "../../helpers/setAuthToken";
import axiosClient from "../../helpers/axios";
import { AppDispatch } from "../store";

export const createProject = (name: string, color: string, push: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setProjectLoading());
    const res = await axiosClient.post("/projects/add", { name, color });
    dispatch({ type: CREATE_PROJECT, payload: res.data });
    push(`/${res.data.id}/tasks`);
    message.success("Project " + name + " was successfully created");
  } catch (err: any) {
    dispatch({ type: CREATE_PROJECT_FAIL });
  }
};

export const getProjects = () => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axiosClient.get("/projects");
    dispatch({ type: GET_PROJECTS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: LOAD_PROJECTS_FAIL });
  }
};

export const getModalProjects = () => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axiosClient.get("/projects");
    dispatch({ type: GET_MODAL_PROJECTS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: LOAD_PROJECTS_FAIL });
  }
};

export const getProject = (project_id: string, push: any) => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setProjectLoading());
    const res = await axiosClient.get(`/${project_id}`);
    dispatch({ type: GET_SINGLE_PROJECT, payload: res.data[0] });
  } catch (err: any) {
    push("/");
    message.error("Project doesn't exists or unauthorized access!");
  }
};

export const changeName = (project_id: string, name: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/name`, { name });
    dispatch({ type: SET_PROJECT_BUDGET, payload: name });
  } catch (err: any) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const setFavorite = (project_id: string, status: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/favorite`, { status: status });
    dispatch({ type: SET_FAVORITE_PROJECT, payload: { id: project_id, status: status } });
  } catch (err: any) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const setBudget = (project_id: string, budget: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/budget`, { budget: budget });
    dispatch({ type: SET_PROJECT_BUDGET, payload: { id: project_id, budget: budget } });
  } catch (err: any) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const setCurrency = (project_id: string, currency: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/currency`, { currency: currency });
    dispatch({ type: SET_PROJECT_CURRENCY, payload: { id: project_id, budget: currency } });
  } catch (err: any) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const deleteProject = (project_id: string, push: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}`);
    dispatch({ type: LEAVE_PROJECT, payload: project_id });
    push(`/`);
  } catch (err: any) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const updateColor = (project_id: string, color: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/color`, { color: color });
    dispatch({ type: UPDATE_PROJECT_COLOR, payload: { color: color } });
  } catch (err: any) {
    dispatch({ type: SET_FAVORITE_PROJECT_FAIL });
  }
};

export const updateStatus = (project_id: string, status: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/status`, { status: status });
    dispatch({ type: UPDATE_PROJECT_STATUS, payload: { status: status } });
    message.success("Status updated");
  } catch (err: any) {
    dispatch({ type: UPDATE_PROJECT_STATUS_FAIL });
  }
};

export const setProjectLoading = () => {
  return {
    type: PROJECT_LOADING
  };
};

export const resetProject = () => {
  return {
    type: RESET_SINGLE_PROJECT
  };
};

export const resetAuth = () => {
  return {
    type: RESET_AUTH
  };
};
