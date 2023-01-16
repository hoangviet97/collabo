import { SHOW_TASK_MODAL, CLOSE_TASK_MODAL } from "./types";
import { AppDispatch } from "../store";

export const showTaskModal = () => (dispatch: AppDispatch) => {
  dispatch({ type: SHOW_TASK_MODAL });
};

export const closeTaskModal = () => (dispatch: AppDispatch) => {
  dispatch({ type: CLOSE_TASK_MODAL });
};
