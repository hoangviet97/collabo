import { CREATE_PROJECT, CREATE_PROJECT_FAIL } from "../actions/types";

const initialState = {
  inProject: null
};

function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // runs everytime when main component re-render
    case CREATE_PROJECT:
      return {
        ...state,
        inProject: true
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        inProject: false
      };
    default:
      return state;
  }
}

export default projectReducer;
