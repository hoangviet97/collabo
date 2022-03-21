import React from "react";

const ReportTableRow = ({ task }) => {
  return (
    <div className="report__table-row" style={{ backgroundColor: "white", margin: "5px", padding: "7px 5px" }}>
      <div style={{ fontSize: "10px" }}>{task.section}</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="" style={{ textAlign: "center" }}>
          {task.title}
        </div>
        <div style={{ textAlign: "center" }}>{task.priority}</div>
      </div>
    </div>
  );
};

export default ReportTableRow;
