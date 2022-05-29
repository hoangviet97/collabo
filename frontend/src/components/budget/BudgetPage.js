import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { useDispatch, useSelector } from "react-redux";
import { getProjectTasks } from "../../actions/task";

const BudgetPage = ({ match }) => {
  const dispatch = useDispatch();
  const [totalBudget, setTotalBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [spending, setSpending] = useState(0);
  const budget = useSelector((state) => state.project.currentProject.budget);
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getProjectTasks({ project: match.params.id }));
  }, []);

  useEffect(() => {
    const st = tasks.map((item) => item.budget).reduce((prev, next) => prev + next, 0);
    setSpending(st);
  }, [tasks]);

  return (
    <div>
      <Container size="30">
        <header className="budget__header">
          <div style={{ display: "flex" }}>
            <div class="budget__header-left">
              <div className="budget__header-item">
                <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Total Balance</div>
                <div style={{ fontSize: "48px", marginBottom: "25px" }}>${budget - spending}</div>
              </div>
              <div style={{ width: "100%" }}>
                <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Budget Spending</div>
                <div className="budget__progress" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                  <div className="budget__bar" style={{ width: "400px", height: "15px", backgroundColor: "#ecf0f1", borderRadius: "12px", marginRight: "5px", marginBottom: "3px" }}>
                    <div style={{ backgroundColor: "#5cb85c", width: `${Math.floor((spending / 40) * 100).toFixed(2)}%`, height: "15px", borderRadius: "12px" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="budget__header-right" style={{ display: "flex", alignItems: "flex-end", marginLeft: "10px" }}>
              <div style={{ display: "flex" }}>
                <div className="budget__header-item" style={{ marginRight: "20px" }}>
                  <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Spent</div>
                  <div>{Math.floor((spending / 40) * 100).toFixed(2)}%</div>
                </div>
                <div className="budget__header-item" style={{ marginRight: "20px" }}>
                  <div style={{ color: "#a4b0be", fontWeight: "bolder" }}>Total budget</div>
                  <div>${budget}</div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default BudgetPage;
