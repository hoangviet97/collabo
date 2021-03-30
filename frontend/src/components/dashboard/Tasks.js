import React from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";
import NoContent from "./noContent/NoContent";

const Tasks = () => {
  let content = <NoContent type="task" />;

  return (
    <div>
      <Toolbar />
      <Container size="30">{content}</Container>
    </div>
  );
};

export default Tasks;
