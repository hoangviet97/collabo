import { CREATE_INCOME, GET_INCOMES, DELETE_INCOME, INCOME_LOADING, INCOME_SUM } from "../../actions/types";
import { folder } from "../../types/types";

const initialState = {
  incomes: [],
  loading: false,
  sum: 0
};

function incomeReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INCOME:
      const newSum = state.sum + parseInt(payload.amount);
      return {
        ...state,
        incomes: [...state.incomes, payload],
        sum: newSum
      };
    case GET_INCOMES:
      return {
        ...state,
        incomes: payload,
        loading: false
      };
    case INCOME_SUM:
      return {
        ...state,
        sum: parseInt(payload)
      };
    case INCOME_LOADING:
      return {
        ...state,
        loading: true
      };
    case DELETE_INCOME:
      return {
        ...state,
        folders: state.incomes.filter((item: any) => item.id !== payload)
      };
    default:
      return state;
  }
}

export default incomeReducer;
