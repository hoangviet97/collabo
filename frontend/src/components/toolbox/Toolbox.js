import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { showTaskModal } from "../../actions/modal";

const Toolbox = () => {
  const dispatch = useDispatch();

  const taskModalHandler = () => {
    dispatch(showTaskModal());
    //upravit na localni modal
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
