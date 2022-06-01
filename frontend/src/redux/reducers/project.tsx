import { CREATE_PROJECT, RESET_AUTH, GET_PROJECT_AUTH, CREATE_PROJECT_FAIL, SET_PROJECT_CURRENCY, SET_PROJECT_BUDGET, LEAVE_PROJECT, UPDATE_PROJECT_COLOR, GET_PROJECTS, LOAD_PROJECTS_FAIL, GET_SINGLE_PROJECT, ERROR_SINGLE_PROJECT, PROJECT_LOADING, SET_FAVORITE_PROJECT, SET_FAVORITE_PROJECT_FAIL, UPDATE_PROJECT_STATUS, UPDATE_PROJECT_STATUS_FAIL } from "../../actions/types";

const initialState = {
  loading: false,
  authorized: false,
  projects: [],
  currentProject: {}
};

function projectReducer(state = initialState, action: any) {
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
        ...state
      };
    case GET_PROJECT_AUTH:
      return {
        ...state,
        authorized: true
      };
    case RESET_AUTH:
      return {
        ...state,
        authorized: false
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
        loading: false,
        authorized: true
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
    case LEAVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((item: any) => item.id !== payload)
      };
    case SET_FAVORITE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((item: any) => (item.id === payload.id ? { ...item, favorite: payload.status } : item))
      };
    case SET_PROJECT_BUDGET:
      return {
        ...state,
        projects: state.projects.map((item: any) => (item.id === payload.id ? { ...item, budget: payload.budget } : item))
      };
    case SET_PROJECT_CURRENCY:
      return {
        ...state,
        projects: state.projects.map((item: any) => (item.id === payload.id ? { ...item, currency: payload.currency } : item))
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