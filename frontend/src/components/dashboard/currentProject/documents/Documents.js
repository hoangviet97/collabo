import React from "react";
import Container from "../../../utils/Container";
import { Tabs } from "antd";
import NewFileForm from "./NewFileForm";

const Documents = () => {
  const { TabPane } = Tabs;
  return (
    <div className="documents">
      <Container size="30">
        <Tabs defaultActiveKey="1">
          <TabPane tab="New document" key="1">
            <NewFileForm />
          </TabPane>
          <TabPane tab="Document List" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
};

export default Documents;
