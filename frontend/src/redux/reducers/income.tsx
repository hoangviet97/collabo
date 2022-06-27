import { CREATE_INCOME, GET_INCOMES, DELETE_INCOME, INCOME_LOADING } from "../../actions/types";
import { folder } from "../../types/types";

const initialState = {
  incomes: [],
  loading: false
};

function incomeReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INCOME:
      return {
        ...state,
        folders: [...state.incomes, payload]
      };
    case GET_INCOMES:
      return {
        ...state,
        incomes: payload,
        loading: false
      };
    case INCOME_LOADING:
      return {
        ...state,
        loading: true
      };
    case DELETE_INCOME:
      return {
        ...state,
        folders: state.incomes.filter((item: folder) => item.id !== payload)
      };
    default:
      return state;
  }
}

export default incomeReducer;
