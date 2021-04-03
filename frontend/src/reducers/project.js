import { CREATE_PROJECT, CREATE_PROJECT_FAIL, GET_PROJECTS, LOAD_PROJECTS_FAIL } from "../actions/types";

const initialState = {
  inProject: false,
  projects: null
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
    default:
      return state;
  }
}

export default projectReducer;
