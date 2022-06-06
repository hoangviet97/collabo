import { CREATE_TAG, CREATE_TASK_TAG, GET_TAGS, GET_TASK_TAGS, DELETE_TAGS, TAGS_LOADING } from "../../actions/types";

const initialState = {
  tags: [],
  taskTags: [],
  loading: false
};

function tagReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TAG:
      return {
        ...state,
        tags: [...state.tags, payload]
      };
    case CREATE_TASK_TAG:
      return {
        ...state,
        taskTags: [...state.taskTags, { tasks_id: payload.task, tags_id: payload.tag }]
      };
    case GET_TAGS:
      return {
        ...state,
        tags: payload,
        loading: false
      };
    case GET_TASK_TAGS:
      return {
        ...state,
        taskTags: payload
      };
    case DELETE_TAGS:
      return {
        ...state,
        tags: state.tags.filter((x: any) => x.id !== payload)
      };
    case TAGS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default tagReducer;
