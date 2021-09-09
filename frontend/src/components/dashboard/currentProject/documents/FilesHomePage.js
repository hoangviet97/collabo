import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import NewFileForm from "./NewFileForm";
import FolderList from "./FolderList";
import FileList from "./FileList";
import FileStorage from "./FileStorage";
import { Form, Input, Button, Modal } from "antd";
import { createFolder } from "../../../../actions/folder";
import { UploadOutlined } from "@ant-design/icons";

const FilesHomePage = ({ files, folders, project_id }) => {
  const dispatch = useDispatch();
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
    dispatch(createFolder({ title: newFolder, project_id: project_id }));
    setIsFolderModalVisible(false);
  };

  return (
    <div>
      <div className="files">
        <div class="files__data">
          <FolderList folders={folders} showModal={showModal} />
          <div class="files__recent-files">
            <div class="files__recent-files-header">
              <span style={{ fontSize: "27px", fontWeight: "bold" }}>All files</span>
              <div class="files__recent-options">
                <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("upload")}>
                  <UploadOutlined />
                  Upload file
                </Button>
              </div>
            </div>
          </div>
          <Modal title="Basic Modal" width="500px" visible={isModalVisible} onOk={() => handleOk("upload")} onCancel={() => handleCancel("upload")} footer={null}>
            <NewFileForm project_id={project_id} />
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
          <FileList files={files} folders={folders} />
        </div>
        <FileStorage />
      </div>
    </div>
  );
};

export default FilesHomePage;
