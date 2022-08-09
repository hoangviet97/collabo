import React, { FC, useEffect } from "react";
import Container from "../utils/Container";
import ActivityItem from "./ActivityItem";
import { getLogs } from "../../actions/log";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";

const Activities = () => {
  const dispatch = useDispatch();
  const params: any = useParams();

  const logs = useSelector((state: RootStateOrAny) => state.log.logs);

  useEffect(() => {
    dispatch(getLogs({ project_id: params.id }));
  }, []);

  return (
    <Container size="50">
      <header className="activity__header">
        <div style={{ fontSize: "30px" }}>Activity Log</div>
      </header>
      <div className="activity__wrapper">
        <div>
          {logs.map((item: any) => (
            <ActivityItem data={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Activities;
