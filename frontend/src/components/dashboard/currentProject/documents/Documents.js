import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import { Tabs } from "antd";
import NewFileForm from "./NewFileForm";
import { connect } from "react-redux";
import { getAllFiles } from "../../../../actions/file";
import FileList from "./FileList";

const Documents = (props) => {
  const { TabPane } = Tabs;

  useEffect(() => {
    props.getAllFiles({ project_id: props.match.params.id });
  }, []);

  return (
    <div className="documents">
      <Container size="30">
        <Tabs defaultActiveKey="1">
          <TabPane tab="New document" key="1">
            <NewFileForm project_id={props.match.params.id} />
          </TabPane>
          <TabPane tab="Document List" key="2">
            <FileList files={props.files} />
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  files: state.file.files
});

export default connect(mapStateToProps, { getAllFiles })(Documents);
