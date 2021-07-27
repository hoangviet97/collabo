import { GET_MEMBERS, GET_MEMBERS_FAIL } from "../actions/types";

const initialState = {
  members: []
};

function memberReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: payload
      };
    case GET_MEMBERS_FAIL:
      return {
        ...state,
        members: []
      };
    default:
      return state;
  }
}

export default memberReducer;
