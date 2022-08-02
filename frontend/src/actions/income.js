import { CREATE_INCOME, GET_INCOMES, DELETE_INCOME, INCOME_LOADING, INCOME_FAIL, INCOME_SUM } from "./types";
import axios from "axios";
import { message } from "antd";

export const createIncome = ({ title, amount, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/incomes/add`, { title, amount });
    dispatch({ type: CREATE_INCOME, payload: res.data });
  } catch (err) {
    dispatch({ type: INCOME_FAIL });
  }
};

export const getAllIncomes = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/incomes`);
    dispatch({ type: GET_INCOMES, payload: res.data });
  } catch (err) {
    dispatch({ type: INCOME_FAIL });
  }
};

export const getIncomeSum = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`http://localhost:9000/api/${project_id}/incomes/sum`);
    dispatch({ type: INCOME_SUM, payload: res.data });
  } catch (err) {
    dispatch({ type: INCOME_FAIL });
  }
};

export const deleteIncome = ({ project_id, income_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/incomes/${income_id}`);
    dispatch({ type: DELETE_INCOME, payload: income_id });
  } catch (err) {
    dispatch({ type: INCOME_FAIL });
  }
};

export const setLoading = () => {
  return {
    type: INCOME_LOADING
  };
};
