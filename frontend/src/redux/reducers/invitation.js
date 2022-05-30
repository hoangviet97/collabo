import { CREATE_INVITATION, ACCEPT_INVITATION, DELETE_INVITATION, CREATE_INVITATION_FAIL, GET_PROJECT_INVITATIONS, UPDATE_SEEN_INVITATION, GET_INVITATIONS, GET_INVITATIONS_FAIL } from "../../actions/types";

const initialState = {
  sended: [],
  invitations: []
};

function invitationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INVITATION:
      return {
        ...state,
        sended: [...state.sended, payload]
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
    case GET_PROJECT_INVITATIONS:
      return {
        ...state,
        sended: payload
      };
    case GET_INVITATIONS_FAIL:
      return {
        ...state
      };
    case DELETE_INVITATION:
      return {
        ...state,
        invitations: state.invitations.filter((item) => item.id !== payload)
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
