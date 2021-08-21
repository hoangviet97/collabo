import React, { useEffect, useState } from "react";
import Container from "../../../utils/Container";
import { Form, Input, Button, Modal } from "antd";
import NewFileForm from "./NewFileForm";
import { connect } from "react-redux";
import { getAllFiles } from "../../../../actions/file";
import FileList from "./FileList";
import FolderCard from "./FolderCard";
import FileStorage from "./FileStorage";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";

const Documents = (props) => {
  useEffect(() => {
    props.getAllFiles({ project_id: props.match.params.id });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);

  const showModal = (modalType) => {
    modalType === "upload" ? setIsModalVisible(true) : setIsFolderModalVisible(true);
  };

  const handleOk = (modalType) => {
    modalType === "upload" ? setIsModalVisible(false) : setIsFolderModalVisible(false);
  };

  const handleCancel = (modalType) => {
    modalType === "upload" ? setIsModalVisible(false) : setIsFolderModalVisible(false);
  };

  return (
    <Container size="30">
      <div className="files">
        <div class="files__data">
          <div class="files__folders-container" style={{ marginBottom: "60px" }}>
            <div class="files__folders-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
              <span style={{ fontSize: "27px", fontWeight: "bold" }}>Folders</span>
              <div class="files__folders-options" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <a>View all</a>
                <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("folder")}>
                  <PlusCircleOutlined />
                  Add folder
                </Button>
              </div>
            </div>
            <div class="files__folders-list" style={{ display: "flex", gap: "15px" }}>
              <FolderCard />
              <FolderCard />
              <FolderCard />
              <FolderCard />
            </div>
          </div>
          <div class="files__recent-files">
            <div class="files__recent-files-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
              <span style={{ fontSize: "27px", fontWeight: "bold" }}>Files</span>
              <div class="files__recent-options" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("upload")}>
                  <UploadOutlined />
                  Upload file
                </Button>
              </div>
            </div>
          </div>
          <Modal title="Basic Modal" width="500px" visible={isModalVisible} onOk={() => handleOk("upload")} onCancel={() => handleCancel("upload")} footer={null}>
            <NewFileForm project_id={props.match.params.id} />
          </Modal>
          <Modal title="files" width="500px" visible={isFolderModalVisible} onOk={() => handleOk("folder")} onCancel={() => handleCancel("folder")} footer={null}>
            <Form>
              <Form.Item>
                <Input placeholder="Name" />
              </Form.Item>
            </Form>
          </Modal>
          <FileList files={props.files} />
        </div>
        <FileStorage />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  files: state.file.files
});

export default connect(mapStateToProps, { getAllFiles })(Documents);
