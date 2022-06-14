import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR, AUTH_LOADING, CHANGE_FIRSTNAME, CHANGE_LASTNAME } from "./types";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import { message } from "antd";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get("http://localhost:9000/api/profile");
    dispatch({ type: USER_LOADED, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    console.log(err);
  }
};

export const register = ({ firstname, lastname, email, password, push }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/register", { firstname, lastname, email, password });
    dispatch({ type: REGISTER_SUCCESS, payload: res });
    message.success("Registration Success!");
  } catch (err) {
    message.error(err.response.data.message);
    console.log(err.response.data.message);
    dispatch({ type: REGISTER_FAIL });
  }
};

export const verifyAccount = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/verify/${id}`);
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("http://localhost:9000/api/login", { email, password });

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    message.error(err.response.message);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const changeFirstname = ({ firstname }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/firstname", { firstname });
    dispatch({ type: CHANGE_FIRSTNAME, payload: firstname });
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};

export const changeLastname = ({ lastname }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/lastname", { lastname });
    dispatch({ type: CHANGE_LASTNAME, payload: lastname });
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};

export const changePassword = ({ id, password }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/change-pwd", { id, password });
  } catch (err) {
    console.log(err.response);
  }
};

export const reset = ({ email }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/reset", { email });
    console.log(res);
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
