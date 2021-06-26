import { CREATE_CHANNEL, CREATE_CHANNEL_FAIL, GET_CHANNELS, GET_CHANNELS_FAIL } from "../actions/types";

const initialState = {
  channels: []
};

function channelReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, payload]
      };
    case CREATE_CHANNEL_FAIL:
      return {
        ...state
      };
    case GET_CHANNELS:
      return {
        ...state,
        channels: payload
      };
    case GET_CHANNELS_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default channelReducer;
