import React, { useState } from "react";
import { Button, Input } from "antd";
import OptionPreview from "./OptionPreview";

const PollEditor = ({ setPollWindow }) => {
  const [question, setQuestion] = useState("");
  const [viewData, setViewData] = useState(false);
  const [optionArr, setOptionArr] = useState([]);
  const [option, setOption] = useState("");

  const submitOptionHandler = (e) => {
    e.preventDefault();
    setOptionArr([...optionArr, option]);
    setOption("");
  };

  return (
    <div>
      <Button onClick={() => setPollWindow(false)}>Cancel</Button>
      {!viewData && (
        <div>
          <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Choose your question..." />
          <Button onClick={() => setViewData(true)}>Set</Button>
        </div>
      )}

      {viewData && (
        <div className="" style={{ marginTop: "20px" }}>
          <h2>{question}</h2>
          <div className="option__preview" style={{ marginBottom: "10px" }}>
            {optionArr.map((item) => (
              <OptionPreview text={item} />
            ))}
          </div>
          <form onSubmit={submitOptionHandler}>
            <Input value={option} onChange={(e) => setOption(e.target.value)} placeholder="Enter the option..." />
          </form>
          <Button>Create</Button>
        </div>
      )}
    </div>
  );
};

export default PollEditor;
