import { CREATE_INVITATION, CREATE_INVITATION_FAIL, UPDATE_SEEN_INVITATION, GET_INVITATIONS, GET_INVITATIONS_FAIL } from "../actions/types";

const initialState = {
  sended_invitations: [],
  invitations: []
};

function invitationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INVITATION:
      return {
        ...state,
        sended_invitations: payload
      };
    case CREATE_INVITATION_FAIL:
      return {
        ...state,
        sended_invitations: []
      };
    case GET_INVITATIONS:
      return {
        ...state,
        invitations: payload
      };
    case GET_INVITATIONS_FAIL:
      return {
        ...state
      };
    case UPDATE_SEEN_INVITATION:
      return {
        ...state,
        invitations: state.invitations.map((item) => (item.id === payload.id ? { ...item, seen: payload.seenStatus } : item))
      };
    default:
      return state;
  }
}

export default invitationReducer;
