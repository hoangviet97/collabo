import React, { useEffect, FC } from "react";
import Container from "../../components/utils/Container";
import { useDispatch } from "react-redux";
import { getAllFiles, getFileTypes } from "../../redux/actions/file";
import { getAllFolders } from "../../redux/actions/folder";
import Content from "../../components/documents/Content";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

interface Props {
  match: any;
}

const DocumentsPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch<AppDispatch>();
  const params: any = useParams();

  useEffect(() => {
    dispatch(getAllFolders(params.id));
    dispatch(getAllFiles(params.id));
    dispatch(getFileTypes(params.id));
  }, []);

  return (
    <Container size="50">
      <div className="files">
        <Content match={match} />
      </div>
    </Container>
  );
};

export default DocumentsPage;
