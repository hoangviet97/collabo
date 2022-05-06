import React, { useState } from "react";
import { Button, Input } from "antd";
import OptionPreview from "./OptionPreview";

const PollEditor = ({ setPollWindow, getPollData }) => {
  const [question, setQuestion] = useState("");
  const [viewData, setViewData] = useState(false);
  const [optionArr, setOptionArr] = useState([]);
  const [option, setOption] = useState("");

  const submitOptionHandler = (e) => {
    e.preventDefault();
    setOptionArr([...optionArr, option]);
    setOption("");
  };

  const removeOption = (value) => {
    const newArr = optionArr.filter((x) => x !== value);
    setOptionArr(newArr);
  };

  const submitPollHandler = () => {
    getPollData(question, optionArr, false);
  };

  return (
    <div>
      <Button style={{ marginTop: "-5px" }} onClick={() => setPollWindow(false)}>
        Cancel
      </Button>
      {!viewData && (
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Choose your question..." />
          <Button onClick={() => setViewData(true)}>Set</Button>
        </div>
      )}

      {viewData && (
        <div className="" style={{ marginTop: "20px" }}>
          <h2>{question}</h2>
          <div className="option__preview" style={{ marginBottom: "10px" }}>
            {optionArr.map((item, index) => (
              <OptionPreview key={index} text={item} removeOption={removeOption} />
            ))}
          </div>
          <form onSubmit={submitOptionHandler}>
            <Input value={option} onChange={(e) => setOption(e.target.value)} placeholder="Enter the option..." />
          </form>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <Button type="primary" onClick={submitPollHandler}>
              Create
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollEditor;
