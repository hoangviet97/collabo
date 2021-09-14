import React, { useEffect, FC } from "react";
import Container from "../../../utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getAllFiles } from "../../../../actions/file";
import { getAllFolders } from "../../../../actions/folder";
import FileHomePage from "./FilesHomePage";
import FolderPage from "./FolderPage";
import { Switch, Route } from "react-router-dom";

interface Props {
  match: any;
}

const Documents: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootStateOrAny) => state.file.files);
  const folders = useSelector((state: RootStateOrAny) => state.folder.folders);

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
          <FolderPage {...match} />
        </Route>
      </Switch>
    </Container>
  );
};

export default Documents;
