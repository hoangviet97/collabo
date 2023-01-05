import React, { useEffect } from "react";
import Container from "../../components/utils/Container";
import ActivityItem from "../../components/activityItem/ActivityItem";
import { getLogs } from "../../redux/actions/log";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { log } from "../../types/types";

const ActivityPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const params: any = useParams<{ id: string }>();

  const logs = useSelector((state: RootStateOrAny) => state.log.logs);

  useEffect(() => {
    dispatch(getLogs(params.id));
  }, []);

  return (
    <Container size="50">
      <header className="activity__header">
        <div style={{ fontSize: "30px" }}>Activity Log</div>
      </header>
      <div className="activity__wrapper">
        <div>
          {logs.map((item: log, index: number) => (
            <ActivityItem key={index} data={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ActivityPage;
