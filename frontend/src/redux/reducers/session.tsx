import { CREATE_SESSION, CREATE_SESSION_FAIL, GET_PARTICIPANTS, ADD_PARTICIPANT, DELETE_PARTICIPANT, SESSIONS_LOADING, GET_SESSIONS, GET_SESSIONS_FAIL, GET_SESSION, GET_SESSION_FAIL, SESSION_LOADING, DELETE_SESSION, UPDATE_NOTE, ACTIVE_SESSIONS, TODAY_SESSIONS, PAST_SESSIONS } from "../../actions/types";
import moment from "moment";
import { session } from "../../types/types";

interface sessionState {
  sessions: session[];
  single: any;
  loading: boolean;
  singleLoading: boolean;
  participants: any[];
}

const initialState = {
  sessions: [],
  single: {},
  loading: false,
  singleLoading: false,
  participants: []
};

function sessionReducer(state: sessionState = initialState, action: any) {
  const { type, payload } = action;
  const today: Date = new Date();

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
        filteredSessions: payload,
        loading: false
      };
    case GET_SESSIONS_FAIL:
      return {
        ...state,
        sessions: [],
        loading: false
      };
    case GET_SESSION:
      return {
        ...state,
        single: payload,
        singleLoading: false
      };
    case DELETE_SESSION:
      return {
        ...state,
        sessions: state.sessions.filter((item: session) => item.id !== payload)
      };
    case ADD_PARTICIPANT:
      return {
        ...state,
        participants: [...state.participants, payload],
        loading: false
      };
    case DELETE_PARTICIPANT:
      return {
        ...state,
        participants: state.participants.filter((item: any) => item.email !== payload),
        loading: false
      };
    case GET_PARTICIPANTS:
      return {
        ...state,
        participants: payload,
        loading: false
      };
    case ACTIVE_SESSIONS:
      const filteredActive = state.sessions.filter((item: session) => moment(item.date).format("MMMM Do YYYY, h:mm:ss a") >= moment(today).format("MMMM Do YYYY, h:mm:ss a"));
      return {
        ...state,
        filteredSessions: filteredActive
      };
    case TODAY_SESSIONS:
      const filteredToday = state.sessions.filter((item: session) => moment(item.date).format("MMMM Do YYYY, h:mm:ss a") === moment(today).format("MMMM Do YYYY, h:mm:ss a"));
      return {
        ...state,
        filteredSessions: filteredToday
      };
    case PAST_SESSIONS:
      const a = state.sessions.filter((item: session) => moment(today).format("MMMM Do YYYY, h:mm:ss a") > moment(item.date).format("MMMM Do YYYY, h:mm:ss a"));
      console.log(a);
      return {
        ...state,
        filteredSessions: state.sessions.filter((item: session) => moment(today).format("MMMM Do YYYY, h:mm:ss a") > moment(item.date).format("MMMM Do YYYY, h:mm:ss a"))
      };
    case SESSIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SESSION_LOADING:
      return {
        ...state,
        singleLoading: true
      };
    default:
      return state;
  }
}

export default sessionReducer;
