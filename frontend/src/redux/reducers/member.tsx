import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE, UPDATE_MEMBER_ROLE_FAILED, DELETE_MEMBER } from "../../actions/types";
import { member } from "../../types/types";

const initialState = {
  members: [],
  review_members: []
};

function memberReducer(state = initialState, action: any) {
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
        members: state.members.map((item: member) => (item.id === payload.id ? { ...item, role_id: payload.role_id } : item))
      };
    case UPDATE_MEMBER_ROLE_FAILED:
      return {
        ...state
      };
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((item: member) => item.id !== payload.id)
      };
    default:
      return state;
  }
}

export default memberReducer;
