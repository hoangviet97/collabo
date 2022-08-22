import React, { useEffect, useState, FC } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getExpenses } from "../../actions/task";
import { getAllIncomes, getIncomeSum } from "../../actions/income";
import { task } from "../../types/types";
import IncomeForm from "./IncomeForm";
import { Tabs } from "antd";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";
import getCurrency from "../../helpers/currencyIcon";

interface Props {
  match: any;
}

const BudgetPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<number>(0);
  const [spending, setSpending] = useState<number>(0);

  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const currency = useSelector((state: RootStateOrAny) => state.project.currentProject.currency);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const incomes = useSelector((state: RootStateOrAny) => state.income.sum);

  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getExpenses(match.params.id));
    dispatch(getAllIncomes(match.params.id));
    dispatch(getIncomeSum(match.params.id));
  }, []);

  useEffect(() => {
    const calc: number = incomes - spending;
    setBalance(calc);
  }, [incomes, spending]);

  useEffect(() => {
    const st = tasks.map((item: task) => item.budget).reduce((prev: number, next: number) => prev + next, 0);
    setSpending(st);
  }, [tasks]);

  return (
    <div>
      <Container size="50">
        <div style={{ display: "flex", width: "100%" }}>
          <header className="budget__header" style={{ width: user_role === "Member" ? "100%" : "65%" }}>
            <div style={{ display: "flex" }}>
              <div className="budget__header-left">
                <div className="budget__header-item">
                  <div className="budget__title">Total Balance</div>
                  <div style={{ fontSize: "48px", marginBottom: "25px" }}>
                    {getCurrency(currency)} {isNaN(balance) ? "0" : balance}
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <div className="budget__title">Budget Spending</div>
                  <div className="budget__progress">
                    <div className="budget__bar">
                      <div style={{ backgroundColor: "#5cb85c", width: `${Math.floor((spending / incomes) * 100).toFixed(2)}%`, height: "15px", borderRadius: "12px" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="budget__header-right">
                <div style={{ display: "flex" }}>
                  <div className="budget__header-item">
                    <div className="budget__title">Spent</div>
                    <div>{isNaN(spending / incomes) ? "0" : Math.floor((spending / incomes) * 100).toFixed(2)}%</div>
                  </div>
                  <div className="budget__header-item">
                    <div className="budget__title">Total budget</div>
                    <div>
                      {getCurrency(currency)} {isNaN(incomes) ? "0" : incomes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {user_role === "Owner" && <IncomeForm />}
        </div>
        <div style={{ marginTop: "30px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <FallOutlined />
                  Expenses
                </span>
              }
              key="1"
            >
              <ExpenseList />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <RiseOutlined />
                  Incomes
                </span>
              }
              key="2"
            >
              <IncomeList />
            </TabPane>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default BudgetPage;
