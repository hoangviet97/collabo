import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR, AUTH_LOADING, CHANGE_FIRSTNAME, CHANGE_LASTNAME, CHANGE_COLOR } from "./types";
import setAuthToken from "../helpers/setAuthToken";
import { message } from "antd";
import axiosClient from "../helpers/axios";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axiosClient.get("/profile");
    dispatch({ type: USER_LOADED, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ firstname, lastname, email, password, push }) => async (dispatch) => {
  try {
    const res = await axiosClient.post("/register", { firstname, lastname, email, password });
    dispatch({ type: REGISTER_SUCCESS, payload: res });
    message.success("Registration Success!");
  } catch (err) {
    console.log(err.response);
    message.error(err.response.data.message);
    dispatch({ type: REGISTER_FAIL });
  }
};

export const verifyAccount = ({ id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/verify/${id}`);
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axiosClient.post("/login", { email, password });

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    message.error(err.response.data.message);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const changeColor = ({ color }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch("/color", { color });
    dispatch({ type: CHANGE_COLOR, payload: color });
  } catch (err) {
    console.log(err.response);
  }
};

export const changeFirstname = ({ firstname }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch("/firstname", { firstname });
    dispatch({ type: CHANGE_FIRSTNAME, payload: firstname });
  } catch (err) {
    console.log(err.response);
  }
};

export const changeLastname = ({ lastname }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch("/lastname", { lastname });
    dispatch({ type: CHANGE_LASTNAME, payload: lastname });
  } catch (err) {
    console.log(err.response);
  }
};

export const changePassword = ({ currentPassword, newPassword }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch("/change-pwd", { currentPassword, newPassword });
    message.success("Password has been changed!");
  } catch (err) {
    message.error(err.response.data.message);
  }
};

export const setNewPassword = ({ token, password, history }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch("/reset-pwd", { token, password });
    history.push("/login");
    message.success("Password has been changed!");
  } catch (err) {
    message.error("Error!");
  }
};

export const reset = ({ email }) => async (dispatch) => {
  try {
    const res = await axiosClient.post("/reset", { email });
    message.success("Check your e-mail for the reset link");
  } catch (err) {
    console.log(err.response);
  }
};

export const setLoading = () => {
  return {
    type: AUTH_LOADING
  };
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
