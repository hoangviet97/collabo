import React, { useState, FC, ChangeEvent } from "react";
import { Button, Input, message } from "antd";
import OptionPreview from "./OptionPreview";

interface Props {
  setPollWindow: any;
  getPollData: any;
}

const PollEditor: FC<Props> = ({ setPollWindow, getPollData }) => {
  const [question, setQuestion] = useState<string>("");
  const [viewData, setViewData] = useState<boolean>(false);
  const [optionArr, setOptionArr] = useState<string[]>([]);
  const [option, setOption] = useState<string>("");

  const submitOptionHandler = (e: any) => {
    e.preventDefault();
    if (option.length < 1) {
      message.error("Option cannot be empty!");
    } else {
      setOptionArr([...optionArr, option]);
      setOption("");
    }
  };

  const removeOption = (value: string) => {
    const newArr = optionArr.filter((x: string) => x !== value);
    setOptionArr(newArr);
  };

  const submitPollHandler = () => {
    getPollData(question, optionArr, false);
  };

  const cancelHandler = () => {
    setOption("");
    setOptionArr([]);
    setQuestion("");
    setPollWindow(false);
  };

  const setQuestionHandler = () => {
    if (question.length < 1) {
      message.error("Question cannot be empty");
    } else {
      setViewData(true);
    }
  };

  return (
    <div style={{ padding: "20px 15px" }}>
      <Button style={{ marginTop: "-5px" }} onClick={cancelHandler}>
        Cancel
      </Button>
      {!viewData && (
        <div className="poll__editor-question">
          <Input value={question} aria-label="question-text" onChange={(e) => setQuestion(e.target.value)} placeholder="Choose your question..." style={{ marginRight: "10px" }} />
          <Button type="primary" aria-label="set-question" onClick={setQuestionHandler}>
            Set question
          </Button>
        </div>
      )}

      {viewData && (
        <div className="" style={{ marginTop: "20px" }}>
          <h2 data-testid="question-display">{question}</h2>
          <div className="option__preview-list" style={{ marginBottom: "10px" }}>
            {optionArr.map((item: string, index: number) => (
              <OptionPreview key={index} text={item} removeOption={removeOption} />
            ))}
          </div>
          <form onSubmit={submitOptionHandler}>
            <Input value={option} onChange={(e: ChangeEvent<HTMLInputElement>) => setOption(e.target.value)} placeholder="Enter the option..." />
          </form>
          <div className="poll__editor-create">
            <Button type="primary" onClick={submitPollHandler}>
              Create poll
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollEditor;
