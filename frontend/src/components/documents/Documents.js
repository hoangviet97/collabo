import React, { useEffect, FC } from "react";
import Container from "../utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getAllFiles } from "../../actions/file";
import { getAllFolders } from "../../actions/folder";
import Content from "./Content";
import SidePanel from "./SidePanel";

const Documents = ({ match }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const fileDetail = useSelector((state) => state.file.fileDetail);
  const folders = useSelector((state) => state.folder.folders);

  useEffect(() => {
    dispatch(getAllFolders({ project_id: match.params.id }));
    dispatch(getAllFiles({ project_id: match.params.id }));
  }, []);

  return (
    <Container size="30">
      <div className="files">
        <Content files={files} folders={folders} project_id={match.params.id} match={match} />
        <SidePanel file={fileDetail} />
      </div>
    </Container>
  );
};

export default Documents;
