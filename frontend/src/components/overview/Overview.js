import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import BudgetChart from "./BudgetChart";
import StatusChart from "./StatusChart";
import { TeamOutlined, ClockCircleOutlined, FormOutlined } from "@ant-design/icons";
import { getProjectTasks2 } from "../../actions/task";

const Overview = ({ match }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const [mytasks, settasks] = useState(tasks);

  useEffect(() => {
    dispatch(getProjectTasks2({ id: match.params.id }));

    return () => {
      settasks([]);
    };
  }, []);

  console.log(match.params.id);
  return (
    <Container size="30">
      <div class="overview">
        <div class="overview__left">
          <div class="a">
            <div class="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total tasks</span>
              </div>
              <div style={{ fontSize: "40px" }}>{mytasks.length}</div>
            </div>
            <div class="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <ClockCircleOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total time</span>
              </div>
              <div style={{ fontSize: "40px" }}>123</div>
            </div>
            <div class="overview__highlight-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TeamOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
                <span>Total members</span>
              </div>
              <div style={{ fontSize: "40px" }}>12</div>
            </div>
          </div>
          <div class="b" style={{ padding: "10px" }}>
            <StatusChart autoFit={true} />
          </div>
          <div class="c"></div>
        </div>
        <div class="overview__right">
          <div class="d">
            <BudgetChart />
          </div>
          <div class="e"></div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
