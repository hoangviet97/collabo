import React, { useEffect, FC } from "react";
import Container from "../utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getAllFiles, getFileTypes } from "../../actions/file";
import { getAllFolders } from "../../actions/folder";
import Content from "./Content";
import { useParams } from "react-router-dom";

interface Props {
  match: any;
}

const Documents: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();

  useEffect(() => {
    dispatch(getAllFolders({ project_id: params.id }));
    dispatch(getAllFiles({ project_id: params.id }));
    dispatch(getFileTypes({ project_id: params.id }));
  }, []);

  return (
    <Container size="50">
      <div className="files">
        <Content match={match} />
      </div>
    </Container>
  );
};

export default Documents;
