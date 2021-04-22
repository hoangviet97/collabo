import { CREATE_TASK, CREATE_TASK_FAIL, GET_PROJECT_TASKS, GET_PROJECT_TASKS_FAIL } from "../actions/types";

const initialState = {
  tasks: []
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
        tasks: payload
      };
    case GET_PROJECT_TASKS_FAIL:
      return {
        ...state,
        tasks: []
      };
    default:
      return state;
  }
}

export default taskReducer;
