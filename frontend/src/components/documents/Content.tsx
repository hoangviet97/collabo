import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import FileHomePage from "./files/FileHomePage";
import FolderDetail from "./folders/FolderDetail";
import { Switch, Route } from "react-router-dom";

interface Props {
  files: any;
  match: any;
}

const Content: FC<Props> = ({ files, match }) => {
  return (
    <div className="files__data">
      <Switch>
        <Route exact path={`${match.path}/`}>
          <FileHomePage files={files} project_id={match.params.id} match={match} />
        </Route>
        <Route exact path={`${match.path}/folders/:folderId`}>
          <FolderDetail {...match} />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
