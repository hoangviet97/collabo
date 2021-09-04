import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE } from "../actions/types";

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
    case UPDATE_MEMBER_ROLE:
      return {
        ...state,
        members: state.members.map((item) => (item.id === payload.id ? { ...item, role_id: payload.role_id } : item))
      };
    default:
      return state;
  }
}

export default memberReducer;
