import { CREATE_PROJECT, CREATE_PROJECT_FAIL, UPDATE_PROJECT_COLOR, GET_PROJECTS, LOAD_PROJECTS_FAIL, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING, SET_FAVORITE_PROJECT, SET_FAVORITE_PROJECT_FAIL, UPDATE_PROJECT_STATUS, UPDATE_PROJECT_STATUS_FAIL } from "../../actions/types";

const initialState = {
  loading: false,
  projects: [],
  currentProject: {}
};

function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // runs everytime when main component re-render
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload]
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
    case UPDATE_PROJECT_COLOR:
      return {
        ...state,
        currentProject: { ...state.currentProject, color: payload.color }
      };
    case LOAD_PROJECTS_FAIL:
      return {
        ...state,
        projects: null
      };
    case UPDATE_PROJECT_STATUS:
      return {
        ...state,
        currentProject: { ...state.currentProject, project_status_id: payload.status }
      };
    case UPDATE_PROJECT_STATUS_FAIL:
      return {
        ...state
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
    case SET_FAVORITE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((item) => (item.id === payload.id ? { ...item, favorite: payload.status } : item))
      };
    case SET_FAVORITE_PROJECT_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default projectReducer;
