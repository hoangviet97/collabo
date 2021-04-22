import { GET_SECTIONS, GET_SECTIONS_FAIL, GET_MODAL_SECTIONS, GET_MODAL_SECTIONS_FAIL, CREATE_SECTION, CREATE_SECTION_FAIL } from "../actions/types";

const initialState = {
  sections: [],
  modalSections: []
};

function sectionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SECTION:
      return {
        ...state
      };
    case CREATE_SECTION_FAIL:
      return {
        ...state
      };
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
    case GET_MODAL_SECTIONS:
      return {
        ...state,
        modalSections: payload
      };
    case GET_MODAL_SECTIONS_FAIL:
      return {
        ...state,
        modalSections: []
      };
    default:
      return state;
  }
}

export default sectionReducer;
