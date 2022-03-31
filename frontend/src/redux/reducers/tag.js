import { CREATE_TAG, GET_TAGS, GET_TASK_TAGS, DELETE_TAGS } from "../../actions/types";

const initialState = {
  tags: [],
  taskTags: []
};

function tagReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TAG:
      return {
        ...state,
        tags: [...state.tags, payload]
      };
    case GET_TAGS:
      return {
        ...state,
        tags: payload
      };
    case GET_TASK_TAGS:
      return {
        ...state,
        taskTags: payload
      };
    case DELETE_TAGS:
      return {
        ...state,
        tags: state.tags.filter((x) => x.id !== payload)
      };
    default:
      return state;
  }
}

export default tagReducer;
