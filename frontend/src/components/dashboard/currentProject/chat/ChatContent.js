import React from "react";
import { Switch, Route } from "react-router-dom";

const ChatContent = () => {
  return <div className="meeting__content" style={{ overflowY: "scroll", backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flex: 1, borderRadius: "12px" }}></div>;
};

export default ChatContent;
