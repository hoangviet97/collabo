import { CREATE_TIME_RECORD, TIME_RECORD_SUM, CREATE_TIME_RECORD_FAIL, GET_TIME_RECORDS, GET_TIME_RECORDS_FAIL, GET_TIME_RECORDS_BY_USER } from "../../actions/types";
import moment from "moment";

const initialState = {
  records: [],
  sum: 0,
  week_records: []
};

function getThisWeekDates() {
  var weekDates = [];

  for (var i = 1; i <= 7; i++) {
    const dayForm = moment().day(i);
    weekDates.push({ day: moment(dayForm).format("dddd"), dayFormat: dayForm.format(), sum: 0 });
  }

  return weekDates;
}

function timeRecordsReducer(state = initialState, action: any) {
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
    case TIME_RECORD_SUM:
      return {
        ...state,
        sum: payload
      };
    case GET_TIME_RECORDS_BY_USER:
      let days = getThisWeekDates();

      for (let i = 0; i < payload.length; i++) {
        const val = days.find((x) => moment(x.dayFormat).format("MMM Do YY") === moment(payload[i].start).format("MMM Do YY"));
        if (val) {
          val["sum"] += parseInt((payload[i].total / 60).toFixed(0));
        }
      }

      return {
        ...state,
        records: payload,
        week_records: days
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
