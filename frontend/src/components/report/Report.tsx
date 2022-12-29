import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { getMemberRecords } from "../../redux/actions/time_record";
import { getUserTasks } from "../../redux/actions/task";
import moment from "moment";
import { Column } from "@ant-design/plots";

const Report: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);
  const [avgTime, setAvgTime] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [completed, setCompleted] = useState<number>(0);
  const [inProgress, setInProgress] = useState<number>(0);
  const [underReview, setUnderReview] = useState<number>(0);
  const time_records = useSelector((state: RootStateOrAny) => state.time_record.records);
  const time_sum = useSelector((state: RootStateOrAny) => state.time_record.sum);
  const week_records = useSelector((state: RootStateOrAny) => state.time_record.week_records);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);

  useEffect(() => {
    dispatch(getMemberRecords(params.id, params.memberId));
    dispatch(getUserTasks(params.id, params.memberId));
  }, [params.memberId]);

  useEffect(() => {
    setCompleted(tasks.filter((i: any) => i.statusId === "3").length);
    setInProgress(tasks.filter((i: any) => i.statusId === "1").length);
    setUnderReview(tasks.filter((i: any) => i.statusId === "5").length);
  }, [tasks]);

  useEffect(() => {
    const today = new Date();
    time_records.filter((i: any) => moment(i.created_at).format("YYYY MM DD") === moment(today).format("YYYY MM DD")).map((item: any) => setTotalToday((prev) => prev + item.total));
    const sum = time_records.map((item: any) => parseInt(item.total)).reduce((partialSum: any, a: any) => partialSum + a, 0);
    setTotal(sum);

    const avg = sum / time_records.length;
    setAvgTime(avg);

    return () => {
      setTotal(0);
      setTotalToday(0);
    };
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
            <BarChartOutlined className="report__header-icon" />
            <span style={{ fontSize: "22px" }}>Total working time</span>
          </div>
          <div className="report__header-value">{Math.floor(total / 60) < 5400 ? `${Math.floor(total / 60)}  minutes` : `${Math.floor(total / 3600)}  hours`}</div>
        </div>
        <div className="report-item__time">
          <div style={{ marginBottom: "10px" }}>
            <LineChartOutlined className="report__header-icon" />
            <span style={{ fontSize: "22px" }}>Today working time</span>
          </div>
          <div className="report__header-value">{Math.floor(totalToday / 60) < 5400 ? `${Math.floor(totalToday / 60)}  minutes` : `${Math.floor(totalToday / 3600)}  hours`}</div>
        </div>
        <div className="report-item__time">
          <div style={{ marginBottom: "10px" }}>
            <LineChartOutlined className="report__header-icon" />
            <span style={{ fontSize: "22px" }}>Average working time</span>
          </div>
          <div className="report__header-value">{Math.floor(avgTime / 60) < 5400 ? `${isNaN(Math.floor(avgTime / 60)) ? 0 : Math.floor(avgTime / 60)}  minutes` : `${isNaN(Math.floor(avgTime / 3600)) ? 0 : Math.floor(avgTime / 3600)}  hours`}</div>
        </div>
      </div>

      <div className="report-item__week">
        <div style={{ marginBottom: "10px" }}>
          <BarChartOutlined className="report__header-icon" />
          <span style={{ fontSize: "22px" }}>
            Weekly progress <span style={{ fontSize: "12px" }}>(minutes)</span>
          </span>
        </div>
        <Column {...config} />
      </div>
      <div className="report__status">
        <div className="report__status-card" style={{ backgroundColor: "black" }}>
          <div>Total Tasks</div>
          <div>{tasks.length}</div>
        </div>
        <div className="report__status-card" style={{ backgroundColor: "#3f8ff7" }}>
          <div>In Progress</div>
          <div>{inProgress}</div>
        </div>
        <div className="report__status-card" style={{ backgroundColor: "#f7cb6b" }}>
          <div>Under Review</div>
          <div>{underReview}</div>
        </div>
        <div className="report__status-card" style={{ backgroundColor: "#badc58" }}>
          <div>Completed</div>
          <div>{completed}</div>
        </div>
      </div>
    </div>
  );
};

export default Report;
