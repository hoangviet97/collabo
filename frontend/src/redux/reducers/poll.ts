import { CREATE_POLL } from "../actions/types";

const initialState = {
  polls: [],
  options: []
};

function pollReducer(state = initialState, action: any) {
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
