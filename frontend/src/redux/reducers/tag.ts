import { CREATE_TAG, CREATE_TASK_TAG, GET_TAGS, GET_TASK_TAGS, DELETE_TAGS, DELETE_TASK_TAG, TAGS_LOADING, RESET_TAGS } from "../actions/types";
import { tag } from "../../types/types";

interface tagState {
  tags: tag[];
  taskTags: any[];
  loading: boolean;
}

const initialState = {
  tags: [],
  taskTags: [],
  loading: false
};

function tagReducer(state: tagState = initialState, action: any) {
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
        taskTags: [...state.taskTags, { tasks_id: payload.task, tags_id: payload.tag, name: payload.name, color: "green" }]
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
        tags: state.tags.filter((x: tag) => x.id !== payload)
      };
    case DELETE_TASK_TAG:
      return {
        ...state,
        taskTags: state.taskTags.filter((x: any) => x.tags_id !== payload.tag)
      };
    case RESET_TAGS:
      return {
        ...state,
        tags: [],
        taskTags: []
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
