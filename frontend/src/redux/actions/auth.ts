import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR, AUTH_LOADING, CHANGE_FIRSTNAME, CHANGE_LASTNAME, CHANGE_COLOR } from "./types";
import setAuthToken from "../../helpers/setAuthToken";
import { message } from "antd";
import axiosClient from "../../helpers/axios";
import { AppDispatch } from "../store";

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axiosClient.get("/profile");
    dispatch({ type: USER_LOADED, payload: res.data[0] });
  } catch (err: any) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = (firstname: string, lastname: string, email: string, password: string, push: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post("/register", { firstname, lastname, email, password });
    dispatch({ type: REGISTER_SUCCESS });
    message.success("Registration Success!");
  } catch (err: any) {
    message.error(err.response.data.message);
    dispatch({ type: REGISTER_FAIL });
  }
};

export const verifyAccount = (id: string) => async () => {
  try {
    const res = await axiosClient.get(`/verify/${id}`);
  } catch (err: any) {
    console.log(err);
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const res = await axiosClient.post("/login", { email, password });

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err: any) {
    message.error(err.response.data.message);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const changeColor = (color: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch("/color", { color });
    dispatch({ type: CHANGE_COLOR, payload: color });
  } catch (err: any) {
    console.log(err);
  }
};

export const changeFirstname = (firstname: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch("/firstname", { firstname });
    dispatch({ type: CHANGE_FIRSTNAME, payload: firstname });
  } catch (err: any) {
    console.log(err);
  }
};

export const changeLastname = (lastname: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch("/lastname", { lastname });
    dispatch({ type: CHANGE_LASTNAME, payload: lastname });
  } catch (err: any) {
    console.log(err);
  }
};

export const changePassword = (currentPassword: string, newPassword: string) => async () => {
  try {
    const res = await axiosClient.patch("/change-pwd", { currentPassword, newPassword });
    message.success("Password has been changed!");
  } catch (err: any) {
    message.error(err.response.data.message);
  }
};

export const setNewPassword = (token: string, password: string, history: any) => async () => {
  try {
    const res = await axiosClient.patch("/reset-pwd", { token, password });
    history.push("/login");
    message.success("Password has been changed!");
  } catch (err: any) {
    message.error("Error!");
  }
};

export const reset = (email: string) => async () => {
  try {
    const res = await axiosClient.post("/reset", { email });
    message.success("Check your e-mail for the reset link");
  } catch (err: any) {
    console.log(err);
  }
};

export const setLoading = () => {
  return {
    type: AUTH_LOADING
  };
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: LOGOUT });
};
