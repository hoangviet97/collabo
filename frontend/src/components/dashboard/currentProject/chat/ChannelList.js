import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createChannel, getAllChannels } from "../../../../actions/channel";

const ChannelList = (props) => {
  useEffect(() => {
    props.getAllChannels({ id: props.projectId });
  }, []);

  return (
    <div className="channel">
      <ul className="channel__list" style={{ listStyleType: "none" }}>
        {props.channels.map((channel) => (
          <li className="channel__item" key={channel.id}>
            # &nbsp; {channel.name}
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
