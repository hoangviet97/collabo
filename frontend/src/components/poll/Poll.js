import React from "react";
import Option from "./Option";

const Poll = ({ question, options }) => {
  return (
    <div className="poll">
      <span>{question}</span>
      {options.map((item, index) => (
        <Option key={index} data={item} />
      ))}
    </div>
  );
};

export default Poll;
