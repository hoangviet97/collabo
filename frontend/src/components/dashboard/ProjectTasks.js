import React, { useParams } from "react";
import Toolbar from "./Toolbar";

const ProjectTasks = (props) => {
  return (
    <div className="project-tasks">
      <Toolbar />
      <h2>Tasks {props.match.params.id}</h2>
    </div>
  );
};

export default ProjectTasks;
