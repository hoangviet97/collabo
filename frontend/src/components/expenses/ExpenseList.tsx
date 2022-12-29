import React from "react";
import Expense from "./Expense";
import { task } from "../../types/types";
import { useSelector, RootStateOrAny } from "react-redux";

const ExpenseList: React.FunctionComponent = () => {
  const expenses = useSelector((state: RootStateOrAny) => state.task.expenses);

  return (
    <div>
      {expenses.map((item: task, index: number) => (
        <Expense key={index} task={item} />
      ))}
    </div>
  );
};

export default ExpenseList;
