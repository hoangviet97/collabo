import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import { useSelector, useDispatch } from "react-redux";
import { getAllFiles } from "../../../../actions/file";
import { getAllFolders } from "../../../../actions/folder";
import FileHomePage from "./FilesHomePage";

const Documents = (props) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const folders = useSelector((state) => state.folder.folders);

  useEffect(() => {
    dispatch(getAllFolders({ project_id: props.match.params.id }));
    dispatch(getAllFiles({ project_id: props.match.params.id }));
  }, []);

  return (
    <Container size="30">
      <FileHomePage files={files} folders={folders} project_id={props.match.params.id} />
    </Container>
  );
};

export default Documents;
