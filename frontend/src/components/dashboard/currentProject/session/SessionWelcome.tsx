import React from "react";

const SessionWelcome: React.FC = () => {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <div className="session-welcome__content">
        <h2>Hello</h2>
        <p>Please select the existing session or create a new one.</p>
      </div>
    </div>
  );
};

export default SessionWelcome;
