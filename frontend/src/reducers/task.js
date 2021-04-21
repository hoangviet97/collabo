import { CREATE_TASK, CREATE_TASK_FAIL } from "../actions/types";

const initialState = {};

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
    default:
      return state;
  }
}

export default taskReducer;
