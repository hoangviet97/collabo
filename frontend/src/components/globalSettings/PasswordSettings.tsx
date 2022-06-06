import React, { useState, FC } from "react";
import { Divider, message, Input, Button } from "antd";

const AccountDetails = () => {
  const [firstPwd, setFirstPwd] = useState("");
  const [rePwd, setRePwd] = useState("");

  const changePwdHandler = () => {
    if (firstPwd === rePwd) {
    } else {
      return message.error("Passwords doesn't match!");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bolder" }}>Password</span>
        <span>Please enter your current password to change your password</span>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Current password</div>
          <div style={{ flex: "1" }}>
            <Input style={{ width: "410px", marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>New password</div>
          <div style={{ flex: "1" }}>
            <Input style={{ width: "410px", marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Confirm new password</div>
          <div style={{ flex: "1" }}>
            <Input style={{ width: "410px", marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2" }}></div>
          <div style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary">Change</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
