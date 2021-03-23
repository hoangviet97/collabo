import React from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";

const Tasks = () => {
  return (
    <div>
      <Toolbar />
      <Container size="30">
        <h2>Tasks</h2>
      </Container>
    </div>
  );
};

export default Tasks;
