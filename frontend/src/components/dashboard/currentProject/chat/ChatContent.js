import React from "react";

const ChatContent = () => {
  return (
    <div className="meeting__content" style={{ overflowY: "scroll", backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flex: 1, borderRadius: "12px" }}>
      <span>Available Sessions</span>
    </div>
  );
};

export default ChatContent;
