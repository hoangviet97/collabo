import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import Channel from "./Channel";
import Chat from "./Chat";

const ChatContent = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  let { path, url } = useRouteMatch();
  let { ids } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="meeting__content" style={{ overflowY: "scroll", backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flex: 1, borderRadius: "12px" }}>
      <Route exact path={`${path}/:ids`}>
        <Channel />
      </Route>

      <button>{ids}</button>
    </div>
  );
};

export default connect(null, {})(ChatContent);
