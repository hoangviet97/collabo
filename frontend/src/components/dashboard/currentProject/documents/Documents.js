import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import { useSelector, useDispatch } from "react-redux";
import { getAllFiles } from "../../../../actions/file";
import { getAllFolders } from "../../../../actions/folder";
import FileHomePage from "./FilesHomePage";
import FolderPage from "./FolderPage";
import { Switch, Route } from "react-router-dom";

const Documents = ({ match }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const folders = useSelector((state) => state.folder.folders);

  useEffect(() => {
    dispatch(getAllFolders({ project_id: match.params.id }));
    dispatch(getAllFiles({ project_id: match.params.id }));
  }, []);

  return (
    <Container size="30">
      <Switch>
        <Route exact path={`${match.path}/`}>
          <FileHomePage files={files} folders={folders} project_id={match.params.id} match={match} />
        </Route>
        <Route exact path={`${match.path}/folders/:folderId`}>
          <FolderPage match={match} />
        </Route>
      </Switch>
    </Container>
  );
};

export default Documents;
