import { SHOW_TASK_MODAL, CLOSE_TASK_MODAL } from "./types";

export const showTaskModal = () => (dispatch: any) => {
  dispatch({ type: SHOW_TASK_MODAL });
};

export const closeTaskModal = () => (dispatch: any) => {
  dispatch({ type: CLOSE_TASK_MODAL });
};
