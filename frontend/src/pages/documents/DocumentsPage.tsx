import React, { useEffect } from "react";
import Container from "../../components/utils/Container";
import { useDispatch } from "react-redux";
import { getAllFiles, getFileTypes } from "../../redux/actions/file";
import { getAllFolders } from "../../redux/actions/folder";
import Content from "../../components/documents/Content";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const DocumentsPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getAllFolders(params.id));
    dispatch(getAllFiles(params.id));
    dispatch(getFileTypes(params.id));
  }, []);

  return (
    <Container size="50">
      <div className="files">
        <Content />
      </div>
    </Container>
  );
};

export default DocumentsPage;
