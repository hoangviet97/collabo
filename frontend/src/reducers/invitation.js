import { CREATE_INVITATION, CREATE_INVITATION_FAIL } from "../actions/types";

const initialState = {
  sended_invitations: []
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
    default:
      return state;
  }
}

export default invitationReducer;
