import React, { FC } from "react";
import { task } from "../../types/types";

interface Props {
  income: any;
}

const Income: FC<Props> = ({ income }) => {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "10px", marginBottom: "12px", padding: "15px 28px", display: "flex", justifyContent: "space-between" }}>
      <div>{income.title === null || income.title.length === 0 ? "No description" : income.title}</div>
      <div>
        <span style={{ color: "green" }}>+ {income.amount}</span>
      </div>
    </div>
  );
};

export default Income;
