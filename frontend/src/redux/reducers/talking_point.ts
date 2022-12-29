import { CREATE_TALKING_POINT, CREATE_TALKING_POINT_FAIL, GET_TALKING_POINTS, GET_TALKING_POINTS_FAIL, UPDATE_CHECK_STATUS } from "../actions/types";

const initialState = {
  list: [],
  loading: false
};

function talkingPointReducer(state = initialState, action: any) {
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
    case UPDATE_CHECK_STATUS:
      return {
        ...state,
        list: state.list.map((item: any) => (item.id === payload.id ? { ...item, checked: payload.val } : item))
      };
    default:
      return state;
  }
}

export default talkingPointReducer;
