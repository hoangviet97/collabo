import React from "react";
import { Link } from "react-router-dom";

const NewProject = () => {
  return (
    <div className="new-project">
      <div class="new-project__form">
        <div class="new-project__close">
          <Link to="/projects">Cancel</Link>
        </div>
      </div>
      <div class="new-project__bg"></div>
    </div>
  );
};

export default NewProject;
