import React, { useEffect } from "react";
import TimerBody from "./TimerBody";
import TimerHeader from "./TimerHeader";
import TimerLogger from "./TimerLogger";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getTimeRecords } from "../../actions/time_record";

const TimeTracker = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.time_record.records);

  useEffect(() => {
    dispatch(getTimeRecords());
  }, []);

  return (
    <div>
      <Container size="30">
        <TimerHeader records={records} />
        <TimerBody records={records} />
        <TimerLogger records={records} />
      </Container>
    </div>
  );
};

export default TimeTracker;
