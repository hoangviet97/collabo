import { CREATE_SESSION, CREATE_SESSION_FAIL, SESSIONS_LOADING, GET_SESSIONS, GET_SESSIONS_FAIL } from "../actions/types";

const initialState = {
  sessions: [],
  loading: false
};

function sessionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SESSION:
      return {
        ...state,
        sessions: [...state.sessions, payload]
      };
    case CREATE_SESSION_FAIL:
      return {
        ...state
      };
    case GET_SESSIONS:
      return {
        ...state,
        sessions: payload,
        loading: false
      };
    case GET_SESSIONS_FAIL:
      return {
        ...state,
        sessions: []
      };
    case SESSIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default sessionReducer;
