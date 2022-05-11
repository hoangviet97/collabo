import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import FileHomePage from "./files/FileHomePage";
import FolderDetail from "./folders/FolderDetail";
import { Switch, Route } from "react-router-dom";

const Content = ({ files, folders, project_id, match }) => {
  return (
    <div className="files__data">
      <Switch>
        <Route exact path={`${match.path}/`}>
          <FileHomePage files={files} folders={folders} project_id={match.params.id} match={match} />
        </Route>
        <Route exact path={`${match.path}/folders/:folderId`}>
          <FolderDetail {...match} />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
