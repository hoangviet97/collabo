import React, { useState, FC, ChangeEvent } from "react";
import { Modal, Button, Input, message } from "antd";
import { createMessage } from "../../redux/actions/message";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import PollEditor from "../poll/PollEditor";

interface Props {
  visible: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}

const MessageEditor: FC<Props> = ({ visible, handleCancel, handleOk }) => {
  const params = useParams<{ id: string }>();
  const { TextArea } = Input;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const loading = useSelector((state: RootStateOrAny) => state.message.msgLoading);
  const [value, setValue] = useState<string>("");
  const [pollWindow, setPollWindow] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState([]);

  const submitHandler = () => {
    if (value.length < 1) {
      message.error("Text cannot be empty!");
    } else {
      dispatch(createMessage(params.id, value, question, options, user));
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
        <TextArea style={{ fontSize: "20px" }} value={value} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} placeholder="Enter your main text" autoSize={{ minRows: 5, maxRows: 8 }} />
        <footer style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div>
            <Button onClick={() => setPollWindow(true)} data-testid="set-poll">
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
          </div>
          <Button type="primary" disabled={loading} onClick={submitHandler}>
            {loading ? "Please wait..." : "Create message"}
          </Button>
        </footer>
        {pollWindow && (
          <div className="poll__window" data-testid="poll-window">
            <PollEditor setPollWindow={setPollWindow} getPollData={getPollData} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MessageEditor;
