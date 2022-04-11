import React, { useState } from "react";
import { Comment, Avatar, Input, Button, Form } from "antd";
import Poll from "../poll/Poll";

const Message = ({ data, text, name }) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div style={{ border: "0.7px solid grey", width: "70%", padding: "15px", borderRadius: "12px", marginBottom: "40px", backgroundColor: "white" }}>
      <Comment
        actions={[
          showReply ? (
            <div className="message__reply" style={{ width: "100%" }}>
              <Form>
                <div style={{ display: "flex" }}>
                  <Input />
                  <Button>Send</Button>
                </div>
              </Form>
            </div>
          ) : (
            <span onClick={() => setShowReply(true)} key="comment-nested-reply-to">
              Reply to
            </span>
          )
        ]}
        author={<a>{name}</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={<p>{text}</p>}
      ></Comment>
      {data.poll ? <Poll poll={data.poll} options={data.options} /> : ""}
    </div>
  );
};

export default Message;
