import React, { FC } from "react";
import { task } from "../../types/types";
interface Props {
  task: task;
}

const Expense: FC<Props> = ({ task }) => {
  return (
    <div className="expense">
      <div>{task.title}</div>
      <div>
        <span style={{ color: "crimson" }}>- {task.budget}</span>
      </div>
    </div>
  );
};

export default Expense;
