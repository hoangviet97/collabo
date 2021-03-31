import { CLOSE_PROJECT_FORM, SHOW_PROJECT_FORM } from "./types";

export const showNewProjectForm = () => (dispatch) => {
  dispatch({ type: SHOW_PROJECT_FORM });
};

export const closeNewProjectForm = () => (dispatch) => {
  dispatch({ type: CLOSE_PROJECT_FORM });
};
