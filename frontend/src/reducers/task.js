import { CREATE_TASK, CREATE_TASK_FAIL, GET_PROJECT_TASKS, GET_PROJECT_TASKS_FAIL, DELETE_TASK, DELETE_TASK_FAIL, TASKS_LOADING, UPDATE_TASK_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_FAIL } from "../actions/types";

const initialState = {
  tasks: [],
  loading: false
};

function taskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TASK:
      return {
        ...state
      };
    case CREATE_TASK_FAIL:
      return {
        ...state
      };
    case GET_PROJECT_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false
      };
    case GET_PROJECT_TASKS_FAIL:
      return {
        ...state,
        tasks: []
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, task_status_id: payload.statusId } : item))
      };
    case UPDATE_TASK_PRIORITY:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, priorityId: payload.priorityId } : item))
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== payload)
      };
    case DELETE_TASK_FAIL:
      return {
        ...state
      };
    case TASKS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default taskReducer;
