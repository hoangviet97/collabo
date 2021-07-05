import React, { useEffect } from "react";
import { LockOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { createChannel, getAllChannels } from "../../../../actions/channel";
import Channel from "./Channel";

const ChannelList = (props) => {
  useEffect(() => {
    props.getAllChannels({ id: props.projectId });
  }, []);

  let { path, url } = useRouteMatch();

  return (
    <div className="channel" style={{ marginTop: "40px" }}>
      <ul className="channel__list" style={{ listStyleType: "none" }}>
        {props.channels.map((channel) => (
          <div className="channel__item" style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
            <li className="channel__item-link" key={channel.id}>
              <Link to={`${url}/${channel.id}`}># &nbsp; {channel.name}</Link> {channel.private === true || channel.private === 1 ? <LockOutlined /> : ""}
            </li>
            <div className="channel__options" style={{ display: "flex", gap: "8px" }}>
              <div>
                <UserAddOutlined />
              </div>
              <div>
                <SettingOutlined />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channel.channels
});

export default connect(mapStateToProps, { createChannel, getAllChannels })(ChannelList);
