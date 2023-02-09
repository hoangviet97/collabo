import React, { FC } from "react";

interface Props {
  income: any;
}

const Income: FC<Props> = ({ income }) => {
  return (
    <div className="income">
      <div>{income.title === null || income.title.length === 0 ? "No description" : income.title}</div>
      <div>
        <span style={{ color: "green" }}>+ {income.amount}</span>
      </div>
    </div>
  );
};

export default Income;
