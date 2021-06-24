import React, { useState } from "react";
import InviteItem from "./InviteItem";
import { Input, Button } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const InvitePanel = (props) => {
  const [invitation, setInvitation] = useState("");

  const data = [
    { id: 1, name: "John Doe", status: "Pending" },
    { id: 2, name: "Lara Cores", status: "Pending" },
    { id: 3, name: "Jim Torress", status: "Pending" },
    { id: 4, name: "Carl Arsen", status: "Pending" }
  ];

  const [datas, setDatas] = useState(data);

  const createInvitationHandler = (e) => {
    const genId = Math.floor(Math.random() * 600) + 1;
    setDatas([{ id: genId, name: invitation, status: "pending" }, ...datas]);
    console.log(data);
  };

  const [translate, setTranslate] = useState(0);

  const upHandler = () => {
    if (translate !== 0) {
      setTranslate((prev) => prev + 68);
    }
  };

  const downHandler = () => {
    setTranslate((prev) => prev - 68);
  };

  const invitationHandler = (e) => {
    setInvitation(e.target.value);
  };

  return (
    <div className="invite-panel">
      <div class="invite-panel__form-box">
        <form class="invite-panel__form">
          <h2 style={{ color: "white", fontSize: "30px" }}>Invite new member</h2>
          <Input value={invitation} onChange={(e) => invitationHandler(e)} placeholder="Enter e-mail address" />
          <Button onClick={createInvitationHandler}>Invite</Button>
        </form>
      </div>
      <div class="invite-panel__list-box">
        <div className="invite-panel__list">
          {datas.map((item) => (
            <InviteItem key={item.id} position={translate} data={item} />
          ))}
        </div>
        <div class="invite-panel__control-arrows">
          <Button onClick={upHandler} className="invite-panel__control-arrows--up">
            <CaretUpOutlined />
          </Button>
          <Button onClick={downHandler} className="invite-panel__control-arrows--down">
            <CaretDownOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitePanel;
