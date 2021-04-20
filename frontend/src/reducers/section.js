import { GET_SECTIONS, GET_SECTIONS_FAIL } from "../actions/types";

const initialState = {
  sections: []
};

function sectionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTIONS:
      return {
        ...state,
        sections: payload
      };
    case GET_SECTIONS_FAIL:
      return {
        ...state,
        sections: []
      };
    default:
      return state;
  }
}

export default sectionReducer;
