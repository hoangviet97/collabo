import { SHOW_TASK_MODAL, CLOSE_TASK_MODAL } from "../../actions/types";

const initialState = {
  taskModal: false
};

function modalReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_TASK_MODAL:
      return {
        ...state,
        taskModal: true
      };
    case CLOSE_TASK_MODAL:
      return {
        ...state,
        taskModal: false
      };
    default:
      return state;
  }
}

export default modalReducer;
