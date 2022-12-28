import { CREATE_REVIEW, GET_REVIEWS, REVIEWS_LOADING, REVIEW_LOADING, DELETE_REVIEW, GET_PROJECT_REVIEWS, GET_REVIEW_PANEL, DECREASE_REVIEW, GET_REVIEW_FILES } from "../../actions/types";

const initialState = {
  reviews: [],
  review_panel: [],
  project_reviews: [],
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
        reviews: payload.map((item: any) => ({ ...item, files: [] })),
        loading: false
      };
    case GET_REVIEW_FILES:
      return {
        ...state,
        reviews: state.reviews.map((item: any) => (item.id === payload.id ? { ...item, files: payload.data } : item)),
        loading: false
      };
    case GET_PROJECT_REVIEWS:
      return {
        ...state,
        project_reviews: payload,
        loading: false
      };
    case GET_REVIEW_PANEL:
      return {
        ...state,
        review_panel: payload,
        loading: false
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((item: any) => item.review_id !== payload.id)
      };
    case DECREASE_REVIEW:
      const member: any = state.review_panel.find((x: any) => x.member_id === payload.member_id);
      const newTotal = parseInt(member?.total) - 1;
      return {
        ...state,
        //review_panel: state.review_panel.filter((item: any) => item.member_id !== payload.member_id)
        review_panel: state.review_panel.map((item: any) => (item.member_id === payload.member_id ? { ...item, total: newTotal } : item))
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
