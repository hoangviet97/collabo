import { CREATE_POST, CREATE_POST_FAIL, GET_POSTS, GET_POSTS_FAIL } from "../../actions/types";

const initialState = {
  posts: []
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, payload]
      };
    case CREATE_POST_FAIL:
      return {
        ...state
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload
      };
    case GET_POSTS_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default postReducer;
