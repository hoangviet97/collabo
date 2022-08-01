import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../../actions/task";
import { getAllIncomes, getIncomeSum } from "../../actions/income";
import { task } from "../../types/types";
import IncomeForm from "./IncomeForm";
import { Tabs } from "antd";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";

const BudgetPage = ({ match }) => {
  const dispatch = useDispatch();
  const [totalBudget, setTotalBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [spending, setSpending] = useState(0);
  const role = useSelector((state) => state.project.currentProject.role);
  const tasks = useSelector((state) => state.task.tasks);
  const incomes = useSelector((state) => state.income.sum);

  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getExpenses({ project_id: match.params.id }));
    dispatch(getAllIncomes({ project_id: match.params.id }));
    dispatch(getIncomeSum({ project_id: match.params.id }));
  }, []);

  useEffect(() => {
    const st = tasks.map((item) => item.budget).reduce((prev, next) => prev + next, 0);
    setSpending(st);
  }, [tasks]);

  return (
    <div>
      <Container size="50">
        <div style={{ display: "flex", width: "100%" }}>
          <header className="budget__header" style={{ width: "65%" }}>
            <div style={{ display: "flex" }}>
              <div class="budget__header-left">
                <div className="budget__header-item">
                  <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Total Balance</div>
                  <div style={{ fontSize: "48px", marginBottom: "25px" }}>${parseInt(incomes) - parseInt(spending)}</div>
                </div>
                <div style={{ width: "100%" }}>
                  <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Budget Spending</div>
                  <div className="budget__progress" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <div className="budget__bar" style={{ width: "400px", height: "15px", backgroundColor: "#ecf0f1", borderRadius: "12px", marginRight: "5px", marginBottom: "3px", overflow: "hidden" }}>
                      <div style={{ backgroundColor: "#5cb85c", width: `${Math.floor((spending / incomes) * 100).toFixed(2)}%`, height: "15px", borderRadius: "12px" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="budget__header-right" style={{ display: "flex", alignItems: "flex-end", marginLeft: "10px" }}>
                <div style={{ display: "flex" }}>
                  <div className="budget__header-item" style={{ marginRight: "20px" }}>
                    <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Spent</div>
                    <div>{isNaN(spending / incomes) ? "0" : Math.floor((spending / incomes) * 100).toFixed(2)}%</div>
                  </div>
                  <div className="budget__header-item" style={{ marginRight: "20px" }}>
                    <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Total budget</div>
                    <div>${incomes}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {role === "Owner" && <IncomeForm />}
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
