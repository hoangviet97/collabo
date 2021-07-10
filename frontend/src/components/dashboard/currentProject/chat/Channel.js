import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Channel = (props) => {
  let path = window.location.pathname;
  let pathValue = path.split("/")[3];

  const [data, setData] = useState([]);

  return <div></div>;
};

const mapStateToProps = (state) => ({
  channels: state.channel.channels
});

export default connect(mapStateToProps, {})(Channel);
