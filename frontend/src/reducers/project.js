import { CREATE_PROJECT, CREATE_PROJECT_FAIL, GET_PROJECTS, LOAD_PROJECTS_FAIL, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  projects: [],
  currentProject: []
};

function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // runs everytime when main component re-render
    case CREATE_PROJECT:
      return {
        ...state
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        inProject: false
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false
      };
    case LOAD_PROJECTS_FAIL:
      return {
        ...state,
        projects: null
      };
    case GET_SINGLE_PROJECT:
      return {
        ...state,
        currentProject: payload,
        loading: false
      };
    case ERROR_SINGLE_PROJECT:
      return {
        ...state,
        currentProject: null
      };
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default projectReducer;
