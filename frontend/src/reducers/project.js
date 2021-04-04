import { CREATE_PROJECT, CREATE_PROJECT_FAIL, GET_PROJECTS, LOAD_PROJECTS_FAIL, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT } from "../actions/types";

const initialState = {
  inProject: false,
  projects: null,
  project: null
};

function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // runs everytime when main component re-render
    case CREATE_PROJECT:
      return {
        ...state,
        inProject: true
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        inProject: false
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload
      };
    case LOAD_PROJECTS_FAIL:
      return {
        ...state,
        projects: null
      };
    case GET_SINGLE_PROJECT:
      return {
        ...state,
        project: payload
      };
    case ERROR_SINGLE_PROJECT:
      return {
        ...state,
        project: null
      };
    default:
      return state;
  }
}

export default projectReducer;
