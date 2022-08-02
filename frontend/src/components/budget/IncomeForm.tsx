import React, { useState, FC } from "react";
import { Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createIncome } from "../../actions/income";

const IncomeForm = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const submitHandler = () => {
    console.log(typeof amount);
    if (amount > 0) {
      dispatch(createIncome({ title: title, amount: amount, project_id: params.id }));
      setTitle("");
      setAmount(0);
    } else {
      message.error("Amount must be greater than 0!");
    }
  };

  return (
    <div className="income__form">
      <div>
        <h2 style={{ marginBottom: "25px" }}>Add new income</h2>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
        <Button onClick={submitHandler}>Add</Button>
      </div>
    </div>
  );
};

export default IncomeForm;
