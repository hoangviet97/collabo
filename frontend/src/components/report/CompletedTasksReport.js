import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Table } from "antd";
import { getProjectTasks2, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import ReportTableList from "./ReportTableList";

const CompletedTasksReport = ({ project_id, match }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.task.tasks);
  const assignees = useSelector((state) => state.task.assignees);
  const members = useSelector((state) => state.member.members);
  const params = useParams();

  useEffect(() => {
    dispatch(getMembers({ id: project_id }));
    dispatch(getAllAssignees({ id: project_id }));
    dispatch(getProjectTasks2({ id: project_id }));
  }, []);

  useEffect(() => {
    members.forEach(function (element) {
      element.tasks = [];

      assignees.forEach(function (e) {
        if (e.email === element.email) {
          let single_task = data.find((x) => x.id === e.tasks_id);
          element.tasks.push(single_task);
        }
      });
    });

    console.log(data.filter((i) => i.status === "Completed"));
  }, [data, assignees]);

  const columns = [{ title: "Email", dataIndex: "email", key: "email" }];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={`/${params.id}/report`}>Reports</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Completed tasks</Breadcrumb.Item>
      </Breadcrumb>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
              <ReportTableList tasks={record.tasks} status="Completed" />
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable"
        }}
        dataSource={members}
      />
    </div>
  );
};

export default CompletedTasksReport;
