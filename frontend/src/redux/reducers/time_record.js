import { CREATE_TIME_RECORD, CREATE_TIME_RECORD_FAIL, GET_TIME_RECORDS, GET_TIME_RECORDS_FAIL } from "../../actions/types";

const initialState = {
  records: []
};

function timeRecordsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TIME_RECORD:
      return {
        ...state,
        records: [...state.records, payload]
      };
    case CREATE_TIME_RECORD_FAIL:
      return {
        ...state
      };
    case GET_TIME_RECORDS:
      return {
        ...state,
        records: payload
      };
    case GET_TIME_RECORDS_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default timeRecordsReducer;
