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
    if (amount > 0) {
      console.log(amount);
      dispatch(createIncome({ title: title, amount: amount, project_id: params.id }));
    } else {
      message.error("Amount must be greater than 0!");
    }
  };

  return (
    <div style={{ width: "35%", height: "35vh", backgroundColor: "white", marginLeft: "15px" }}>
      <h3>Add new income</h3>
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input type="text" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
      <Button onClick={submitHandler}>Add</Button>
    </div>
  );
};

export default IncomeForm;
