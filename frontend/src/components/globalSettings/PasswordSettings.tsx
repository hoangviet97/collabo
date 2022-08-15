import React, { useState } from "react";
import { Divider, message, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { changePassword } from "../../actions/auth";

const AccountDetails: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [currentPwd, setCurrentPwd] = useState<string>("");
  const [firstPwd, setFirstPwd] = useState<string>("");
  const [rePwd, setRePwd] = useState<string>("");

  const changePwdHandler = () => {
    if (firstPwd === rePwd) {
      dispatch(changePassword({ currentPassword: currentPwd, newPassword: rePwd }));
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
            <Input value={currentPwd} type="password" onChange={(e) => setCurrentPwd(e.target.value)} style={{ width: "410px", marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>New password</div>
          <div style={{ flex: "1" }}>
            <Input value={firstPwd} type="password" onChange={(e) => setFirstPwd(e.target.value)} style={{ width: "410px", marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Confirm new password</div>
          <div style={{ flex: "1" }}>
            <Input value={rePwd} type="password" onChange={(e) => setRePwd(e.target.value)} style={{ width: "410px", marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ flex: "2" }}></div>
          <div style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={changePwdHandler} type="primary">
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
