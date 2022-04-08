import React, { useState } from "react";
import { Modal, Button, Input, Form, Switch } from "antd";
import { createMessage } from "../../actions/message";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import PollEditor from "../poll/PollEditor";

const MessageEditor = ({ project, visible, handleCancel, handleOk }) => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [pollWindow, setPollWindow] = useState(false);

  const submitHandler = () => {
    dispatch(createMessage({ project: project, text: value }));
  };

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk} footer={null} width="60%">
      <div style={{ padding: "30px 15px" }}>
        <TextArea style={{ fontSize: "20px" }} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Controlled autosize" autoSize={{ minRows: 5, maxRows: 8 }} />
        <footer style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div>
            <Button onClick={() => setPollWindow(true)}>
              <PlusCircleOutlined /> Poll
            </Button>
            <Button>
              <UploadOutlined />
            </Button>
          </div>
          <Button type="primary" onClick={submitHandler}>
            Create
          </Button>
        </footer>
        {pollWindow && (
          <div style={{ position: "absolute", padding: "20px", top: "0px", left: "0px", backgroundColor: "white", width: "100%", height: "100%" }}>
            <PollEditor setPollWindow={setPollWindow} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MessageEditor;
