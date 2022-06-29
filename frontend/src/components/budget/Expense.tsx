import React, { FC } from "react";
import { task } from "../../types/types";
interface Props {
  task: task;
}

const Expense: FC<Props> = ({ task }) => {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "10px", marginBottom: "12px", padding: "15px 28px", display: "flex", justifyContent: "space-between" }}>
      <div>{task.title}</div>
      <div>
        <span style={{ color: "crimson" }}>- {task.budget}</span>
      </div>
    </div>
  );
};

export default Expense;
