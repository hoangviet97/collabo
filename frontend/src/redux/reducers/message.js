import { CREATE_MESSAGE, CREATE_MESSAGE_FAIL, GET_MESSAGES, GET_MESSAGES_FAIL, DATA_LOADING } from "../../actions/types";

const initialState = {
  messages: [],
  replies: [],
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
        messages: payload
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state
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
