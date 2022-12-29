import React from "react";
import Income from "./Income";
import { task } from "../../types/types";
import { useSelector, RootStateOrAny } from "react-redux";

const IncomeList: React.FunctionComponent = () => {
  const incomes = useSelector((state: RootStateOrAny) => state.income.incomes);

  return (
    <div>
      {incomes.map((item: task) => (
        <Income income={item} />
      ))}
    </div>
  );
};

export default IncomeList;
