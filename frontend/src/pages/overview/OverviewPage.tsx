import React, { useEffect } from "react";
import Container from "../../components/utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import StatusChart from "../../components/charts/StatusChart";
import { getProjectTasks, getStatusGroup } from "../../redux/actions/task";
import { getMembers } from "../../redux/actions/member";
import { getSessions } from "../../redux/actions/session";
import { getTimeRecordsSum } from "../../redux/actions/time_record";
import { useParams } from "react-router-dom";
import { getLogs } from "../../redux/actions/log";
import OverviewHeader from "../../components/overviewPanels/OverviewHeader";
import OverviewLogs from "../../components/overviewPanels/OverviewLogs";
import OverviewSessions from "../../components/overviewPanels/OverviewSessions";
import { AppDispatch } from "../../redux/store";

const OverviewPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const statusGroup = useSelector((state: RootStateOrAny) => state.task.statusGroup);

  useEffect(() => {
    dispatch(getProjectTasks(params.id));
    dispatch(getStatusGroup(params.id));
    dispatch(getMembers(params.id));
    dispatch(getSessions(params.id));
    dispatch(getTimeRecordsSum(params.id));
    dispatch(getLogs(params.id));

    console.log(process.env.REACT_APP_BACKEND_URL);
  }, []);

  return (
    <Container size="50">
      <div className="overview">
        <div className="overview__left">
          <div className="a">
            <OverviewHeader />
          </div>
          <div className="b">
            <StatusChart data={statusGroup} />
          </div>
        </div>
        <div className="overview__right">
          <div className="d" style={{ position: "relative" }}>
            <OverviewSessions />
          </div>
          <div className="e">
            <OverviewLogs />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OverviewPage;
