import React, { useEffect, useState } from "react";
import TimerBody from "./TimerBody";
import TimerHeader from "./TimerHeader";
import Container from "../../../utils/Container";
import { connect } from "react-redux";
import { getTimeRecords } from "../../../../actions/time_record";

const TimeTracker = (props) => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    props.getTimeRecords();
  }, []);

  return (
    <div>
      <Container size="30">
        <TimerHeader />
        <TimerBody />
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  records: state.time_record.records
});

export default connect(mapStateToProps, { getTimeRecords })(TimeTracker);
