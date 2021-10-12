import React, { useEffect, FC } from "react";
import Container from "../utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getAllFiles } from "../../actions/file";
import { getAllFolders } from "../../actions/folder";
import Content from "./Content";
import SidePanel from "./SidePanel";

interface Props {
  match: any;
}

const Documents: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootStateOrAny) => state.file.files);
  const fileDetail = useSelector((state: RootStateOrAny) => state.file.fileDetail);
  const folders = useSelector((state: RootStateOrAny) => state.folder.folders);

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
