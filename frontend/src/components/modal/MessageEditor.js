import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { createMessage } from "../../actions/message";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined, UploadOutlined, CheckCircleOutlined } from "@ant-design/icons";
import PollEditor from "../poll/PollEditor";

const MessageEditor = ({ project, visible, handleCancel, handleOk }) => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [pollWindow, setPollWindow] = useState(false);
  const [question, setQuestion] = useState("g");
  const [options, setOptions] = useState([]);

  const submitHandler = () => {
    if (value.length < 1) {
      message.error("Text cannot be empty!");
    } else {
      console.log(question);
      dispatch(createMessage({ project: project, text: value, question: question, options: options }));
    }
  };

  const getPollData = (question, arr, bl) => {
    setQuestion(question);
    setOptions(arr);
    setPollWindow(bl);
  };

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk} footer={null} width="60%">
      <div style={{ padding: "30px 15px" }}>
        <TextArea style={{ fontSize: "20px" }} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Controlled autosize" autoSize={{ minRows: 5, maxRows: 8 }} />
        <footer style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div>
            <Button onClick={() => setPollWindow(true)}>
              {question.length > 0 ? (
                <span style={{ color: "green" }}>
                  <CheckCircleOutlined /> Polls
                </span>
              ) : (
                <span>
                  <PlusCircleOutlined /> Polls
                </span>
              )}
            </Button>
            <Button>
              <UploadOutlined />
            </Button>
          </div>
          <Button type="primary" onClick={submitHandler}>
            Create message
          </Button>
        </footer>
        {pollWindow && (
          <div style={{ position: "absolute", padding: "20px", top: "0px", left: "0px", backgroundColor: "white", width: "100%", height: "100%" }}>
            <PollEditor setPollWindow={setPollWindow} getPollData={getPollData} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MessageEditor;
