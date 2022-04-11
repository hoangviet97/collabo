import React from "react";
import Option from "./Option";

const Poll = ({ poll, options }) => {
  return (
    <div className="poll" style={{ borderRadius: "12px", width: "70%", padding: "30px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
      <h2>{poll.question}</h2>
      <div>
        {options.map((item, index) => (
          <Option key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Poll;
