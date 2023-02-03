import React, { FC } from "react";
import FileHomePage from "./files/FileHomePage";
import FolderDetail from "./folders/FolderDetail";
import { Switch, Route } from "react-router-dom";

interface Props {
  match: any;
}

const Content: FC<Props> = ({ match }) => {
  return (
    <div className="files__data">
      <Switch>
        <Route exact path={`${match.path}/`}>
          <FileHomePage />
        </Route>
        <Route exact path={`${match.path}/folders/:folderId`}>
          <FolderDetail {...match} />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
