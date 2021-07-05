import React, { useEffect } from "react";
import { connect } from "react-redux";

const Channel = (props) => {
  let path = window.location.pathname;
  let pathValue = path.split("/")[3];

  useEffect(() => {}, []);

  let channelName = props.channels.filter((item) => item.id === pathValue);

  return (
    <div>
      <h1>{channelName.name}</h1>
      <div class="chat-window" style={{ position: "relative" }}>
        <div class="message" style={{ position: "absolute", margin: "7px 0", backgroundColor: "#d1d8e0", display: "inline-block", padding: "8px 15px", borderRadius: "12px" }}>
          Hello
        </div>
        <div class="message" style={{ position: "absolute", top: "40px", margin: "7px 0", backgroundColor: "#d1d8e0", display: "inline-block", padding: "8px 15px", borderRadius: "12px" }}>
          Hello, test
        </div>
        <div class="message" style={{ position: "absolute", top: "80px", right: 0, margin: "7px 0", backgroundColor: "#45aaf2", display: "inline-block", padding: "8px 15px", borderRadius: "12px" }}>
          Test version 0.1
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "40px" }}>
        <input style={{ width: "500px", padding: "5px 10px" }} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channel.channels
});

export default connect(mapStateToProps, {})(Channel);
