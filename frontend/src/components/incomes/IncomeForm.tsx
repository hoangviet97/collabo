import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { createIncome } from "../../redux/actions/income";
import { AppDispatch } from "../../redux/store";

const IncomeForm: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const user = useSelector((state: RootStateOrAny) => state.auth.user.lastname);
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const submitHandler = () => {
    if (amount > 0) {
      dispatch(createIncome(title, amount, params.id));
      setTitle("");
      setAmount(0);
    } else {
      message.error("Amount must be greater than 0!");
    }
  };

  return (
    <div className="income__form">
      <div>
        <h2 style={{ marginBottom: "25px" }} data-testid="headline">
          Add new income {user}
        </h2>
        <Input type="text" value={title} data-testid="title-input" onChange={(e) => setTitle(e.target.value)} />
        <Input type="number" value={amount} data-testid="amount-input" onChange={(e) => setAmount(parseInt(e.target.value))} />
        <Button onClick={submitHandler}>Add</Button>
      </div>
    </div>
  );
};

export default IncomeForm;
