import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE, DELETE_MEMBER } from "../../actions/types";

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
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((item) => item.id !== payload.id)
      };
    default:
      return state;
  }
}

export default memberReducer;
