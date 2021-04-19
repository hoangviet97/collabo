import React, { useState } from "react";

const AssingeeModal = (props) => {
  return (
    <>
      <div className="assigneeModal">
        <button onClick={props.close}>Close</button>
      </div>
    </>
  );
};

export default AssingeeModal;
