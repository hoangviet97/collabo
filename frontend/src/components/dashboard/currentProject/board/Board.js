import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import { connect } from "react-redux";
import { getProjectTasks } from "../../../../actions/task";

const Board = (props) => {
  useEffect(() => {
    if (props.tasks.length < 1) {
      props.getProjectTasks({ id: props.match.params.id });
    }
  }, []);

  return (
    <div className="board">
      <Container size="30"></Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  loading: state.task.loading
});

export default connect(mapStateToProps, { getProjectTasks })(Board);
