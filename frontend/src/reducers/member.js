import { GET_MEMBERS, GET_MEMBERS_FAIL } from "../actions/types";

const initialState = {
  memberList: [],
  loading: true
};

function modalReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEMBERS:
      return {
        ...state,
        memberList: payload,
        loading: false
      };
    case GET_MEMBERS_FAIL:
      return {
        ...state,
        memberList: [],
        loading: false
      };
    default:
      return state;
  }
}

export default modalReducer;
