import { CREATE_INVITATION, ACCEPT_INVITATION, ADD_INVITATION, DELETE_INVITATION, CREATE_INVITATION_FAIL, GET_PROJECT_INVITATIONS, UPDATE_SEEN_INVITATION, GET_INVITATIONS, GET_INVITATIONS_FAIL } from "../../actions/types";
import { Invitation } from "../../types/types";

interface invitationState {
  sended: Invitation[];
  invitations: Invitation[];
  unread: number;
}

const initialState = {
  sended: [],
  invitations: [],
  unread: 0
};

function invitationReducer(state: invitationState = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INVITATION:
      return {
        ...state,
        sended: [...state.sended, payload]
      };
    case ADD_INVITATION:
      return {
        ...state,
        invitations: [...state.invitations, payload]
      };
    case CREATE_INVITATION_FAIL:
      return {
        ...state,
        sended_invitations: []
      };
    case GET_INVITATIONS:
      const unseenNum = payload.filter((item: any) => item.seen === 0).length;

      return {
        ...state,
        invitations: payload,
        unread: unseenNum
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
        sended: state.sended.filter((item: Invitation) => item.id !== payload),
        invitations: state.invitations.filter((item: Invitation) => item.id !== payload)
      };
    case UPDATE_SEEN_INVITATION:
      return {
        ...state,
        invitations: state.invitations.map((item: Invitation) => (item.id === payload.id ? { ...item, seen: payload.seenStatus } : item))
      };
    default:
      return state;
  }
}

export default invitationReducer;
