import { CREATE_MESSAGE, CREATE_MESSAGE_FAIL, GET_MESSAGES, GET_MESSAGES_FAIL, DATA_LOADING, UPDATE_VOTE, DELETE_VOTE } from "../../actions/types";

const initialState = {
  messages: [],
  votes: [],
  loading: false
};

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MESSAGE:
      const mergedMsg = Object.assign(payload.msg, { poll: payload.poll }, { options: payload.options });
      return {
        ...state,
        messages: [mergedMsg]
      };
    case CREATE_MESSAGE_FAIL:
      return {
        ...state
      };
    case GET_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: payload.messages,
        votes: payload.votes
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state
      };
    case UPDATE_VOTE:
      console.log(state.messages);
      return {
        ...state,
        votes: [...state.votes, payload]
      };
    case DELETE_VOTE:
      console.log(payload.option_id);
      return {
        ...state,
        votes: state.votes.filter((vote) => vote.option_id !== payload.option_id && payload.email.includes(vote.email))
      };
    case DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default messageReducer;
