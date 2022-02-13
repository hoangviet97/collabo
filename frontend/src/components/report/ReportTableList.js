import React from "react";
import ReportTableRow from "./ReportTableRow";

const ReportTableList = ({ tasks, statusArr }) => {
  //ewData = tasks.filter((x) => x.status === status);
  console.log(tasks);
  return (
    <div>
      {tasks.map((item, index) => {
        if (statusArr.includes(item.status)) {
          return <ReportTableRow key={index} task={item} />;
        }
      })}
    </div>
  );
};

export default ReportTableList;
