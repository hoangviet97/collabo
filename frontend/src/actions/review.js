import { CREATE_REVIEW, GET_REVIEWS, REVIEW_LOADING, REVIEWS_LOADING, REVIEW_FAIL, DELETE_REVIEW, UPDATE_TASK_STATUS, ACCEPT_REVIEW } from "./types";
import axios from "axios";
import { message } from "antd";

export const createReview = ({ task_id, project_id }) => async (dispatch) => {
  try {
    dispatch(setReviewLoading());
    const res = await axios.post(`http://localhost:9000/api/${project_id}/reviews/add`, { task_id });
    dispatch({ type: CREATE_REVIEW, payload: res.data });
    dispatch({ type: UPDATE_TASK_STATUS, payload: { id: task_id, statusId: "5" } });
    message.success("Task sent to review!");
  } catch (err) {
    console.log(err.response);
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getReviews = ({ project_id, member_id }) => async (dispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/reviews/${member_id}`);
    dispatch({ type: GET_REVIEWS, payload: res.data });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const acceptReview = ({ project_id, id, task_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/reviews/${id}/accept`, { task_id });
    message.success("Review accepted!");
    dispatch({ type: DELETE_REVIEW, payload: id });
    //dispatch({ type: UPDATE_TASK_STATUS, payload: id });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const deleteReview = ({ project_id, id, task_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/reviews/${id}/return`, { task_id });
    message.success("Review returned!");
    dispatch({ type: DELETE_REVIEW, payload: id });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const setReviewLoading = () => {
  return {
    type: REVIEW_LOADING
  };
};

export const setReviewsLoading = () => {
  return {
    type: REVIEWS_LOADING
  };
};
