import { CREATE_REVIEW, GET_REVIEWS, REVIEWS_LOADING, REVIEW_LOADING, DELETE_REVIEW } from "../../actions/types";

const initialState = {
  reviews: [],
  loading: false,
  create_loading: false
};

function reviewReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload],
        create_loading: false
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((item: any) => item.review_id !== payload)
      };
    case REVIEWS_LOADING:
      return {
        ...state,
        loading: true
      };
    case REVIEW_LOADING:
      return {
        ...state,
        create_loading: true
      };
    default:
      return state;
  }
}

export default reviewReducer;
