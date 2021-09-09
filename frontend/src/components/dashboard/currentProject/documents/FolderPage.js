import React from "react";
import { useParams, withRouter } from "react-router-dom";

const FolderPage = ({ match }) => {
  const { params } = useParams();
  console.log(match.params.folderId);
  return <div></div>;
};

export default withRouter(FolderPage);
