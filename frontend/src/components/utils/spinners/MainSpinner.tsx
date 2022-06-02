import React from "react";

const MainSpinner = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h1 style={{ letterSpacing: "1px", marginBottom: "30px" }}>
        <span style={{ fontWeight: "lighter" }}>COLLA</span>
        <span style={{ color: "#031428" }}>BOAT</span>
      </h1>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MainSpinner;
