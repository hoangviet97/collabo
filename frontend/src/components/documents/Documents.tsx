import React, { useEffect, FC } from "react";
import Container from "../utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getAllFiles, getFileTypes } from "../../actions/file";
import { getAllFolders } from "../../actions/folder";
import Content from "./Content";

interface Props {
  match: any;
}

const Documents: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootStateOrAny) => state.file.files);

  useEffect(() => {
    dispatch(getAllFolders({ project_id: match.params.id }));
    dispatch(getAllFiles({ project_id: match.params.id }));
    dispatch(getFileTypes({ project_id: match.params.id }));
  }, []);

  return (
    <Container size="30">
      <div className="files">
        <Content files={files} match={match} />
      </div>
    </Container>
  );
};

export default Documents;
