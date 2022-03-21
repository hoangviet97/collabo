import React from "react";
import Container from "../utils/Container";
import Message from "./Message";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import Editor from "./Editor";
import ComingSoon from "../layout/ComingSoon";
import { FieldTimeOutlined } from "@ant-design/icons";

const Messages = ({ children }) => {
  const { TextArea } = Input;

  return (
    <Container size="30">
      <ComingSoon />
    </Container>
  );
};

export default Messages;
