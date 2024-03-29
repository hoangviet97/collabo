import React, { useState } from "react";
import NewFileForm from "./NewFileForm";
import FolderList from "../folders/FolderList";
import FileList from "./FileList";
import { Form, Input, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createFolder } from "../../../redux/actions/folder";
import { useDispatch } from "react-redux";
import FilesStatistics from "./FilesStatistics";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";

const FileHomePage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState<boolean>(false);
  const [newFolder, setNewFolder] = useState<string>("");

  const showModal = (modalType: string) => {
    modalType === "upload" ? setIsModalVisible(true) : setIsFolderModalVisible(true);
  };

  const handleOk = (modalType: string) => {
    modalType === "upload" ? setIsModalVisible(false) : setIsFolderModalVisible(false);
  };

  const handleCancel = (modalType: string) => {
    modalType === "upload" ? setIsModalVisible(false) : setIsFolderModalVisible(false);
  };

  const createFolderHandler = () => {
    dispatch(createFolder(newFolder, params.id));
    setIsFolderModalVisible(false);
  };

  return (
    <div>
      <div className="files__homepage">
        <div className="files__homepage-inter">
          <FolderList showModal={showModal} />
          <div className="files__recent-files">
            <div className="files__recent-files-header">
              <span style={{ fontSize: "27px", fontWeight: "bold" }}>All files</span>
              <div className="files__recent-options">
                <Button type="primary" style={{ borderRadius: "7px" }} onClick={() => showModal("upload")}>
                  <UploadOutlined />
                  Upload file
                </Button>
              </div>
            </div>
          </div>
          <Modal title="Upload" width="500px" visible={isModalVisible} onOk={() => handleOk("upload")} onCancel={() => handleCancel("upload")} footer={null}>
            <NewFileForm />
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
          <FileList />
        </div>
        <div className="files__statistics-wrap">
          <FilesStatistics />
        </div>
      </div>
    </div>
  );
};

export default FileHomePage;
