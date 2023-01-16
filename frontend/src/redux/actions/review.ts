import { CREATE_REVIEW, GET_REVIEWS, REVIEW_LOADING, REVIEWS_LOADING, REVIEW_FAIL, DELETE_REVIEW, UPDATE_TASK_STATUS, GET_PROJECT_REVIEWS, GET_REVIEW_PANEL, DECREASE_REVIEW } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";
import { AppDispatch } from "../store";

export const createReview = (task_id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setReviewLoading());
    const res = await axiosClient.post(`/${project_id}/reviews/add`, { task_id });
    dispatch({ type: CREATE_REVIEW, payload: res.data });
    dispatch({ type: UPDATE_TASK_STATUS, payload: { id: task_id, status: "5" } });
    message.success("Task sent to review!");
  } catch (err: any) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getProjectReviews = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axiosClient.get(`/${project_id}/reviews`);
    dispatch({ type: GET_PROJECT_REVIEWS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getReviews = (project_id: string, member_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axiosClient.get(`/${project_id}/reviews/${member_id}`);
    dispatch({ type: GET_REVIEWS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const getReviewPanel = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setReviewsLoading());
    const res = await axiosClient.get(`/${project_id}/reviews/members`);
    dispatch({ type: GET_REVIEW_PANEL, payload: res.data });
  } catch (err: any) {
    dispatch({ type: REVIEW_FAIL });
  }
};

export const acceptReview = (project_id: string, id: string, task_id: string, member_id: string, comment: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/reviews/${id}/accept`, { task_id, member_id, comment });
    message.success("Review accepted!");
    dispatch({ type: DELETE_REVIEW, payload: { id, member_id } });
    dispatch({ type: DECREASE_REVIEW, payload: { id, member_id } });
  } catch (err: any) {
    dispatch({ type: REVIEW_FAIL });
    message.error("Error");
  }
};

export const deleteReview = (project_id: string, id: string, task_id: string, member_id: string, comment: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/reviews/${id}/return`, { task_id, member_id, comment });
    message.success("Review returned!");
    dispatch({ type: DELETE_REVIEW, payload: { id, member_id } });
    dispatch({ type: DECREASE_REVIEW, payload: { id, member_id } });
  } catch (err: any) {
    dispatch({ type: REVIEW_FAIL });
    message.error("Error");
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
