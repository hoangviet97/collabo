import { CREATE_POLL } from "../../actions/types";

const initialState = {
  polls: {}
};

function pollReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POLL:
      return {
        ...state,
        polls: payload
      };
    default:
      return state;
  }
}

export default pollReducer;
