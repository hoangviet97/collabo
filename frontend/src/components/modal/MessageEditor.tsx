import React, { useState, FC } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { createMessage } from "../../actions/message";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { PlusCircleOutlined, UploadOutlined, CheckCircleOutlined } from "@ant-design/icons";
import PollEditor from "../poll/PollEditor";

interface Props {
  project: any;
  visible: any;
  handleCancel: any;
  handleOk: any;
}

const MessageEditor: FC<Props> = ({ project, visible, handleCancel, handleOk }) => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const [value, setValue] = useState<string>("");
  const [pollWindow, setPollWindow] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState([]);

  const submitHandler = () => {
    if (value.length < 1) {
      message.error("Text cannot be empty!");
    } else {
      dispatch(createMessage({ project_id: project, text: value, question: question, options: options, user: user }));
      setValue("");
      setQuestion("");
      setOptions([]);
    }
  };

  const getPollData = (question: string, arr: any, bl: any) => {
    setQuestion(question);
    setOptions(arr);
    setPollWindow(bl);
  };

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk} footer={null} width="50%">
      <div style={{ padding: "30px 15px" }}>
        <TextArea style={{ fontSize: "20px" }} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter your main text" autoSize={{ minRows: 5, maxRows: 8 }} />
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
