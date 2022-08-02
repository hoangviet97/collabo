import { GET_LOGS } from "../../actions/types";
import { folder } from "../../types/types";

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
    default:
      return state;
  }
}

export default logReducer;
