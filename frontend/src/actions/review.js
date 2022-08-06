import { CREATE_REVIEW, GET_REVIEWS, REVIEW_LOADING, REVIEWS_LOADING, REVIEW_FAIL, DELETE_REVIEW, UPDATE_TASK_STATUS, GET_PROJECT_REVIEWS, GET_REVIEW_PANEL, DECREASE_REVIEW } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createReview = ({ task_id, project_id }) => async (dispatch) => {
  try {
    dispatch(setReviewLoading());
    const res = await axiosClient.post(`/${project_id}/reviews/add`, { task_id });
    dispatch({ type: CREATE_REVIEW, payload: res.data });
    dispatch({ type: UPDATE_TASK_STATUS, payload: { id: task_id, status: "5" } });
    message.success("Task sent to review!");
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getProjectReviews = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axiosClient.get(`/${project_id}/reviews`);
    dispatch({ type: GET_PROJECT_REVIEWS, payload: res.data });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getReviews = ({ project_id, member_id }) => async (dispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axiosClient.get(`/${project_id}/reviews/${member_id}`);
    dispatch({ type: GET_REVIEWS, payload: res.data });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getReviewPanel = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axiosClient.get(`/${project_id}/reviews/members`);
    dispatch({ type: GET_REVIEW_PANEL, payload: res.data });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const acceptReview = ({ project_id, id, task_id, member_id, comment }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/reviews/${id}/accept`, { task_id, member_id, comment });
    message.success("Review accepted!");
    dispatch({ type: DELETE_REVIEW, payload: { id, member_id } });
    dispatch({ type: DECREASE_REVIEW, payload: { id, member_id } });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
    message.error(err.response.data.message);
  }
};

export const deleteReview = ({ project_id, id, task_id, member_id, comment }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/reviews/${id}/return`, { task_id, member_id, comment });
    message.success("Review returned!");
    dispatch({ type: DELETE_REVIEW, payload: { id, member_id } });
    dispatch({ type: DECREASE_REVIEW, payload: { id, member_id } });
  } catch (err) {
    dispatch({ type: REVIEW_FAIL });
    message.error(err.response.data.message);
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
