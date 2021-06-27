import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { createChannel, getAllChannels } from "../../../../actions/channel";

const ChannelList = (props) => {
  useEffect(() => {
    props.getAllChannels({ id: props.projectId });
  }, []);

  let { path, url } = useRouteMatch();

  return (
    <div className="channel">
      <ul className="channel__list" style={{ listStyleType: "none" }}>
        {props.channels.map((channel) => (
          <li className="channel__item" key={channel.id}>
            <Link to={`${url}/${channel.id}`}># &nbsp; {channel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channel.channels
});

export default connect(mapStateToProps, { createChannel, getAllChannels })(ChannelList);
