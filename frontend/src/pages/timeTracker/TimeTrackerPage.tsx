import React, { useEffect, FC } from "react";
import TimerHeader from "../../components/timer/TimerHeader";
import TimerLogger from "../../components/timer/TimerLogger";
import Container from "../../components/utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getTimeRecords } from "../../redux/actions/time_record";

interface Props {
  match: any;
}

const TimeTrackerPage: FC<Props> = ({ match }) => {
  const project_id = match.params.id;
  const dispatch = useDispatch();
  const records = useSelector((state: RootStateOrAny) => state.time_record.records);

  useEffect(() => {
    dispatch(getTimeRecords(project_id));
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
