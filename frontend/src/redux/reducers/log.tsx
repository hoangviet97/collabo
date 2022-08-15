import { GET_UNSEEN_LOGS, GET_LOGS } from "../../actions/types";
import { log } from "../../types/types";

const initialState = {
  logs: [],
  loading: false
};

function logReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOGS:
      return {
        ...state,
        logs: payload,
        loading: false
      };
    case GET_UNSEEN_LOGS:
      return {
        ...state,
        logs: payload.filter((item: log) => item.seen === "F"),
        loading: false
      };
    default:
      return state;
  }
}

export default logReducer;
