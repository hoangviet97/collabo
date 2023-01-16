import React, { useEffect } from "react";
import TimerHeader from "../../components/timer/TimerHeader";
import TimerLogger from "../../components/timer/TimerLogger";
import Container from "../../components/utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getTimeRecords } from "../../redux/actions/time_record";
import { useParams } from "react-router-dom";

const TimeTrackerPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: RootStateOrAny) => state.time_record.records);

  useEffect(() => {
    dispatch(getTimeRecords(params.id));
  }, []);

  return (
    <Container size="50">
      <div className="time__page">
        <TimerHeader records={records} />
        <TimerLogger records={records} />
      </div>
    </Container>
  );
};

export default TimeTrackerPage;
