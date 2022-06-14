import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, AUTH_LOADING, LOGOUT, CHANGE_FIRSTNAME, CHANGE_LASTNAME } from "../../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: {}
};

function authReducer(state = initialState, action: any) {
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
        loading: true,
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
