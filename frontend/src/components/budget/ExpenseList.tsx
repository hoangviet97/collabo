import React from "react";
import Expense from "./Expense";
import { task } from "../../types/types";
import { useSelector, RootStateOrAny } from "react-redux";

const ExpenseList = () => {
  const expenses = useSelector((state: RootStateOrAny) => state.task.expenses);

  return (
    <div>
      {expenses.map((item: task) => (
        <Expense task={item} />
      ))}
    </div>
  );
};

export default ExpenseList;
