import React, { useEffect, FC } from "react";
import TimerHeader from "./TimerHeader";
import TimerLogger from "./TimerLogger";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getTimeRecords } from "../../actions/time_record";

interface Props {
  match: any;
}

const TimeTracker: FC<Props> = ({ match }) => {
  const project_id = match.params.id;
  const dispatch = useDispatch();
  const records = useSelector((state: RootStateOrAny) => state.time_record.records);

  useEffect(() => {
    dispatch(getTimeRecords({ project_id: project_id }));
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

export default TimeTracker;
