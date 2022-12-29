import React from "react";

const MainSpinner = () => {
  return (
    <div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <h1 style={{ letterSpacing: "1px", marginBottom: "30px" }}>
          <span style={{ fontWeight: "lighter", fontSize: "50px" }}>COLLA</span>
          <span style={{ color: "#031428", fontSize: "50px" }}>BOAT</span>
        </h1>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MainSpinner;
