import { GET_SECTIONS, GET_SECTIONS_FAIL, GET_MODAL_SECTIONS, GET_MODAL_SECTIONS_FAIL, CREATE_SECTION, CREATE_SECTION_FAIL, SECTIONS_LOADING, DELETE_SECTION, DELETE_SECTION_FAIL, RESET_SECTIONS } from "../actions/types";
import { section, ISectionAction } from "../../types/types";

interface sectionState {
  sections: section[];
  modalSections: section[];
  loading: boolean;
}

const initialState = {
  sections: [],
  modalSections: [],
  loading: false
};

function sectionReducer(state: sectionState = initialState, action: ISectionAction) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SECTION:
      return {
        ...state,
        sections: [...state.sections, { id: payload.id, name: payload.name }],
        loading: false
      };
    case CREATE_SECTION_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_SECTIONS:
      return {
        ...state,
        sections: payload,
        loading: false
      };
    case GET_SECTIONS_FAIL:
      return {
        ...state,
        sections: []
      };
    case DELETE_SECTION:
      return {
        ...state,
        sections: state.sections.filter((item: section) => item.id !== payload)
      };
    case DELETE_SECTION_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_MODAL_SECTIONS:
      return {
        ...state,
        modalSections: payload
      };
    case GET_MODAL_SECTIONS_FAIL:
      return {
        ...state,
        modalSections: [],
        loading: false
      };
    case RESET_SECTIONS:
      return {
        ...state,
        sections: []
      };
    case SECTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default sectionReducer;
