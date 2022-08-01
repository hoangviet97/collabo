import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { TeamOutlined, ClockCircleOutlined, FormOutlined, BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { getMemberRecords } from "../../actions/time_record";
import { getPersonalTasks, getProjectTasks } from "../../actions/task";
import moment from "moment";
import { Column } from "@ant-design/plots";
import { Divider } from "antd";

const Report = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const [completed, setCompleted] = useState<number>(0);
  const [inProgress, setInProgress] = useState<number>(0);
  const [underReview, setUnderReview] = useState<number>(0);
  const time_records = useSelector((state: RootStateOrAny) => state.time_record.records);
  const week_records = useSelector((state: RootStateOrAny) => state.time_record.week_records);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);

  useEffect(() => {
    dispatch(getMemberRecords({ project_id: params.id, id: params.memberId }));
    dispatch(getPersonalTasks({ project_id: params.id, id: params.memberId }));
  }, [params.memberId]);

  useEffect(() => {
    setCompleted(tasks.filter((i: any) => i.status_id === "3").length);
    setInProgress(tasks.filter((i: any) => i.status_id === "1").length);
    setUnderReview(tasks.filter((i: any) => i.status_id === "5").length);
  }, [tasks]);

  useEffect(() => {
    const sum = time_records.map((item: any) => parseInt(item.total)).reduce((partialSum: any, a: any) => partialSum + a, 0);
    setTotal(sum);
  }, [time_records]);

  const config = {
    data: week_records,
    xField: "day",
    yField: "sum",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      day: {
        alias: "Day"
      },
      sum: {
        alias: "Total"
      }
    }
  };

  return (
    <div className="report-item">
      <div className="report-item__header">
        <div className="report-item__time">
          <div style={{ marginBottom: "10px" }}>
            <BarChartOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
            <span style={{ fontSize: "22px" }}>Total working time</span>
          </div>
          <div style={{ fontSize: "22px", marginLeft: "41px" }}>{(total / 60).toFixed(0)}m</div>
        </div>
        <div className="report-item__time">
          <div style={{ marginBottom: "10px" }}>
            <LineChartOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
            <span style={{ fontSize: "22px" }}>Today working time</span>
          </div>
          <div style={{ fontSize: "22px", marginLeft: "41px" }}>{(total / 60).toFixed(0)}m</div>
        </div>
        <div className="report-item__time">
          <div style={{ marginBottom: "10px" }}>
            <LineChartOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
            <span style={{ fontSize: "22px" }}>Average working time</span>
          </div>
          <div style={{ fontSize: "22px", marginLeft: "41px" }}>{(total / 60).toFixed(0)}m</div>
        </div>
      </div>

      <div className="report-item__week">
        <div style={{ marginBottom: "10px" }}>
          <BarChartOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
          <span style={{ fontSize: "22px" }}>
            Weekly progress <span style={{ fontSize: "12px" }}>(minutes)</span>
          </span>
        </div>
        <Column {...config} />
      </div>
      <div style={{ paddingTop: "120px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        <div style={{ backgroundColor: "black", color: "white", padding: "20px", borderRadius: "10px", fontSize: "20px" }}>
          <div>Total Tasks</div>
          <div>{tasks.length}</div>
        </div>
        <div style={{ backgroundColor: "#3f8ff7", color: "white", padding: "20px", borderRadius: "10px", fontSize: "20px" }}>
          <div>In Progress</div>
          <div>{inProgress}</div>
        </div>
        <div style={{ backgroundColor: "#f7cb6b", color: "white", padding: "20px", borderRadius: "10px", fontSize: "20px" }}>
          <div>Under Review</div>
          <div>{underReview}</div>
        </div>
        <div style={{ backgroundColor: "#badc58", color: "white", padding: "20px", borderRadius: "10px", fontSize: "20px" }}>
          <div>Completed</div>
          <div>{completed}</div>
        </div>
      </div>
    </div>
  );
};

export default Report;
