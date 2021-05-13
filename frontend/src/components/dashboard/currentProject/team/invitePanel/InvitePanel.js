import React, { useState } from "react";
import InviteItem from "./InviteItem";
import { Input, Button } from "antd";

const InvitePanel = () => {
  const data = [
    { id: 1, name: "John Doe", status: "Pending" },
    { id: 2, name: "Lara Cores", status: "Pending" },
    { id: 3, name: "Jim Torress", status: "Pending" },
    { id: 4, name: "Carl Arsen", status: "Pending" },
    { id: 5, name: "spoi Arsen", status: "Pending" },
    { id: 6, name: "lOPLI Arsen", status: "Pending" },
    { id: 7, name: "Ccoc Arsen", status: "Pending" },
    { id: 55, name: "Marly Arsen", status: "Pending" },
    { id: 553, name: "Marly Arsen", status: "Pending" },
    { id: 551, name: "Marly Arsen", status: "Pending" },
    { id: 545, name: "Marly Arsen", status: "Pending" },
    { id: 565, name: "Marly Arsen", status: "Pending" },
    { id: 5115, name: "Marly Arsen", status: "Pending" },
    { id: 5445, name: "Marly Arsen", status: "Pending" },
    { id: 5335, name: "Marly Arsen", status: "Pending" },
    { id: 5235, name: "Marly Arsen", status: "Pending" },
    { id: 5213, name: "Api Arsen", status: "Pending" }
  ];

  const [translate, setTranslate] = useState(0);

  const upHandler = () => {
    if (translate !== 0) {
      setTranslate((prev) => prev + 68);
    }
  };

  const downHandler = () => {
    setTranslate((prev) => prev - 68);
  };

  return (
    <div className="invite-panel">
      <div class="invite-panel__form-box">
        <form class="invite-panel__form">
          <h2 style={{ color: "white", fontSize: "30px" }}>Invite new member</h2>
          <Input placeholder="Enter e-mail address" />
          <Button>Invite</Button>
        </form>
      </div>
      <div class="invite-panel__list-box">
        <div className="invite-panel__list">
          {data.map((item) => (
            <InviteItem key={item.id} position={translate} data={item} />
          ))}
        </div>
        <div class="invite-panel__control-arrows">
          <Button onClick={upHandler} className="invite-panel__control-arrows--up">
            &#65087;
          </Button>
          <Button onClick={downHandler} className="invite-panel__control-arrows--down">
            &#65088;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitePanel;
