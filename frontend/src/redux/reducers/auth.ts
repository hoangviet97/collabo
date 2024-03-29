import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, AUTH_LOADING, LOGOUT, CHANGE_FIRSTNAME, CHANGE_LASTNAME, CHANGE_COLOR } from "../actions/types";
import { IAuthAction } from "../../types/types";

interface initialAuthState {
  token: any;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
}

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: {}
};

function authReducer(state: initialAuthState = initialState, action: IAuthAction) {
  const { type, payload } = action;

  switch (type) {
    // runs everytime when main component re-render
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: localStorage.getItem("token")
      };
    case CHANGE_FIRSTNAME:
      return {
        ...state,
        user: { ...state.user, firstname: payload }
      };
    case CHANGE_COLOR:
      return {
        ...state,
        user: { ...state.user, color: payload }
      };
    case CHANGE_LASTNAME:
      return {
        ...state,
        user: { ...state.user, lastname: payload }
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: null, loading: false, user: null };
    default:
      return state;
  }
}

export default authReducer;
