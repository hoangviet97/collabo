import React, { useState, FC } from "react";
import { Divider, message, Input, Button } from "antd";

interface Props {
  profile: any;
}

const AccountDetails: FC<Props> = ({ profile }) => {
  const [firstname, setFirstname] = useState(profile.firstname);
  const [lastname, setLastname] = useState(profile.lastname);
  const [email, setEmail] = useState(profile.email);

  const firstnameHandler = () => {
    if (firstname !== profile.firstname) {
    }
  };

  const lastnameHandler = () => {
    if (firstname !== profile.lastname) {
    }
  };

  const emailHandler = () => {
    if (firstname !== profile.email) {
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bolder" }}>Personal info</span>
        <span>Update your personal information here</span>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Name</div>
          <div style={{ display: "flex", flexDirection: "row", flex: "1" }}>
            <Input style={{ marginRight: "10px", width: "200px" }} value={firstname} onChange={(e) => setFirstname(e.target.value)} onBlur={firstnameHandler} placeholder="firstname" />
            <Input style={{ width: "200px" }} type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="lastname" />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>E-mail</div>
          <div style={{ display: "flex", flexDirection: "row", flex: "1" }}>
            <Input style={{ width: "410px" }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="firstname" />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Bio</div>
          <div style={{ flex: "1" }}>
            <Input.TextArea rows={4} style={{ width: "410px" }} placeholder="Current password" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
