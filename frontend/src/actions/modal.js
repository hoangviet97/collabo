import { SHOW_TASK_MODAL, CLOSE_TASK_MODAL } from "./types";

export const showTaskModal = () => (dispatch) => {
  dispatch({ type: SHOW_TASK_MODAL });
};

export const closeTaskModal = () => (dispatch) => {
  dispatch({ type: CLOSE_TASK_MODAL });
};
