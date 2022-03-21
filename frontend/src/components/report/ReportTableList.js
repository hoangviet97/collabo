import React from "react";
import ReportTableRow from "./ReportTableRow";

const ReportTableList = ({ tasks }) => {
  console.log(tasks);
  return (
    <div>
      {tasks.map((item, index) => {
        <ReportTableRow key={index} task={item} />;
      })}
    </div>
  );
};

export default ReportTableList;
