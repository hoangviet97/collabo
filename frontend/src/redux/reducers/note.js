import { CREATE_NOTE, UPDATE_NOTE, GET_NOTE } from "../../actions/types";

const initialState = {
  note: {}
};

function noteReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NOTE:
      return {
        ...state,
        note: payload
      };
    case GET_NOTE:
      return {
        ...state,
        note: payload
      };
    case UPDATE_NOTE:
      return {
        ...state,
        note: { ...state.note, text: payload.text }
      };
    default:
      return state;
  }
}

export default noteReducer;
