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
import { createFolder, getAllFolders } from "../../../../actions/folder";

const Documents = (props) => {
  useEffect(() => {
    props.getAllFolders({ project_id: props.match.params.id });
    props.getAllFiles({ project_id: props.match.params.id });
  }, []);

  useEffect(() => {
    const foldersArr = [];
    props.folders.map((item) => foldersArr.push({ name: item.title, sum: 0 }));
    console.log(foldersArr);
  }, [props.files]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [newFolder, setNewFolder] = useState("");

  const showModal = (modalType) => {
    modalType === "upload" ? setIsModalVisible(true) : setIsFolderModalVisible(true);
  };

  const handleOk = (modalType) => {
    modalType === "upload" ? setIsModalVisible(false) : setIsFolderModalVisible(false);
  };

  const handleCancel = (modalType) => {
    modalType === "upload" ? setIsModalVisible(false) : setIsFolderModalVisible(false);
  };

  const createFolderHandler = () => {
    props.createFolder({ title: newFolder, project_id: props.match.params.id });
    setIsFolderModalVisible(false);
  };

  return (
    <Container size="30">
      <div className="files">
        <div class="files__data">
          <div class="files__folders-container" style={{ marginBottom: "80px" }}>
            <div class="files__folders-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
              <span style={{ fontSize: "27px", fontWeight: "bold" }}>Folders</span>
              {props.folders.length > 0 ? (
                <div class="files__folders-options" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {props.folders.length > 4 ? <a>View all</a> : ""}
                  <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("folder")}>
                    <PlusCircleOutlined />
                    Add folder
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div class="files__folders-list" style={{ display: "flex", gap: "15px" }}>
              {props.folders.length > 0 ? (
                props.folders.slice(0, 4).map((item, index) => <FolderCard key={index} folder={item} />)
              ) : (
                <div className="folder-card folder-card--empty" onClick={() => showModal("folder")}>
                  <PlusCircleOutlined style={{ fontSize: "40px", color: "#bdc3c7" }} />
                </div>
              )}
            </div>
          </div>
          <div class="files__recent-files">
            <div class="files__recent-files-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
              <span style={{ fontSize: "27px", fontWeight: "bold" }}>All files</span>
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
                <Input placeholder="Name" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button onClick={createFolderHandler}>Create</Button>
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
  files: state.file.files,
  folders: state.folder.folders
});

export default connect(mapStateToProps, { getAllFiles, createFolder, getAllFolders })(Documents);
