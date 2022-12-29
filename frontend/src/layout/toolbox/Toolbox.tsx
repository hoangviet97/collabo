import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { showTaskModal } from "../../redux/actions/modal";

const Toolbox: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const taskModalHandler = () => {
    dispatch(showTaskModal());
  };

  return (
    <div className="toolbox">
      <Button type="primary" onClick={taskModalHandler}>
        + Task
      </Button>
    </div>
  );
};

export default Toolbox;
