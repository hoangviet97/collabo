import React, { useEffect } from "react";
import Container from "../../components/utils/Container";
import ActivityItem from "../../components/activityItem/ActivityItem";
import { getLogs } from "../../redux/actions/log";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { log } from "../../types/types";
import { AppDispatch } from "../../redux/store";

const ActivityPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();

  const logs = useSelector((state: RootStateOrAny) => state.log.logs);

  useEffect(() => {
    dispatch(getLogs(params.id));
    console.log(process.env);
  }, []);

  return (
    <Container size="50">
      <header className="activity__header">
        <div data-testid="item" style={{ fontSize: "30px" }}>
          Activity Log {process.env.REACT_APP_DATA}
        </div>
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
