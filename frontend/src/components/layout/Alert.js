import React from "react";
import { connect } from "react-redux";

const Alert = (props) => {
  return (
    props.alerts !== null &&
    props.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
