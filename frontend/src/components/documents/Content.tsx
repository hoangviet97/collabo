import React from "react";
import FileHomePage from "./files/FileHomePage";
import FolderDetail from "./folders/FolderDetail";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Content: React.FunctionComponent = () => {
  const match = useRouteMatch();

  return (
    <div className="files__data">
      <Switch>
        <Route exact path={`${match.path}/`}>
          <FileHomePage />
        </Route>
        <Route exact path={`${match.path}/folders/:folderId`}>
          <FolderDetail />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
