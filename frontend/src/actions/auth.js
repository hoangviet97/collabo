import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR } from "./types";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import { message } from "antd";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get("http://localhost:9000/api/profile");
    dispatch({ type: USER_LOADED, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ firstname, lastname, email, password }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/register", { firstname, lastname, email, password });
    console.log(res.data);
    dispatch({ type: REGISTER_SUCCESS, payload: res });
    message.success("Registration Success!");
  } catch (err) {
    //console.log(err.response.data.message);
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/login", { email, password });
    message.success("Login Success!");
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    message.error("failed");
    dispatch({ type: LOGIN_FAIL });
  }
};
