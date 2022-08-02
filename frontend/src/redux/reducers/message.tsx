import { CREATE_MESSAGE, CREATE_MESSAGE_FAIL, SEND_MESSAGE, GET_REPLIES, GET_MESSAGES, GET_MESSAGES_FAIL, DATA_LOADING, UPDATE_VOTE, DELETE_VOTE } from "../../actions/types";

const initialState = {
  messages: [],
  votes: [],
  loading: false,
  replies: []
};

function messageReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MESSAGE:
      const pollMerger = Object.assign(payload.data.poll, { optionArray: payload.data.options });
      const mergedMsg = Object.assign(payload.data.msg, { pollData: pollMerger });
      Object.assign(mergedMsg, { firstname: payload.user.firstname }, { lastname: payload.user.lastname }, { color: payload.user.color });

      console.log(mergedMsg);
      return {
        ...state,
        messages: [mergedMsg, ...state.messages]
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
    case SEND_MESSAGE:
      return {
        ...state,
        replies: [...state.replies, payload]
      };
    case GET_REPLIES:
      return {
        ...state,
        replies: payload
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
        votes: state.votes.filter((vote: any) => vote.option_id !== payload.option_id && payload.email.includes(vote.email))
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
