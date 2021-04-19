import React, { useState } from "react";

const AssingeeModal = (props) => {
  return (
    <>
      <div className="assigneeModal">
        <button onClick={props.close}>Close</button>
        {props.projects.map((project, index) => (
          <div key={index}>{project.name}</div>
        ))}
      </div>
    </>
  );
};

export default AssingeeModal;
