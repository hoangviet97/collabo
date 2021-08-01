import { CREATE_TALKING_POINT, CREATE_TALKING_POINT_FAIL, GET_TALKING_POINTS, GET_TALKING_POINTS_FAIL } from "../actions/types";

const initialState = {
  list: [],
  loading: false
};

function talkingPointReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TALKING_POINT:
      return {
        ...state,
        list: [...state.list, payload]
      };
    case CREATE_TALKING_POINT_FAIL:
      return {
        ...state
      };
    case GET_TALKING_POINTS:
      return {
        ...state,
        list: payload
      };
    case GET_TALKING_POINTS_FAIL:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}

export default talkingPointReducer;
