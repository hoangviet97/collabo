import { GET_FILES } from "../../actions/types";

const initialState = {
  files: []
};

function fileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILES:
      return {
        ...state,
        files: payload
      };
    default:
      return state;
  }
}

export default fileReducer;
