import React from "react";
import Option from "./Option";

const Poll = ({ pollData }) => {
  return (
    <div className="poll" style={{ display: "flex", flexDirection: "column", borderRadius: "12px", width: "70%", padding: "30px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
      <h3>{pollData.question}</h3>
      <div style={{ marginTop: "10px" }}>
        {pollData.optionArray.map((item, index) => (
          <Option key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Poll;
