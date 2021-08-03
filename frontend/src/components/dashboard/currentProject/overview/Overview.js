import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import socket from "../../../../service/socket";

const Overview = () => {
  return (
    <Container size="30">
      <div className="overview" style={{ height: "calc(100vh - 120px)" }}>
        <div class="overview__grid">
          <div class="overview__left-side" style={{ width: "100%" }}>
            <div class="overview__left-cards" style={{ display: "flex", gap: "15px", width: "100%" }}>
              <div class="overview__card-sm" style={{ backgroundColor: "green", width: "50%", borderRadius: "12px" }}>
                Tasks
              </div>
              <div class="overview__card-sm" style={{ backgroundColor: "grey", width: "50%", borderRadius: "12px" }}>
                Sessions
              </div>
            </div>
            <div class="overview__chart" style={{ backgroundColor: "blue", borderRadius: "12px" }}>
              mm
            </div>
          </div>
          <div class="overview__right-side">
            <div class="overview__project-card" style={{ backgroundColor: "purple", borderRadius: "12px" }}></div>
            <div class="overview__card-md" style={{ backgroundColor: "yellow", borderRadius: "12px" }}></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
