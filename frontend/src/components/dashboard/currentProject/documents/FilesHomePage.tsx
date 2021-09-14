import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import NewFileForm from "./NewFileForm";
import FolderList from "./FolderList";
import FileList from "./FileList";
import FileStorage from "./FileStorage";
import { Form, Input, Button, Modal } from "antd";
import { createFolder } from "../../../../actions/folder";
import { UploadOutlined } from "@ant-design/icons";

interface Props {
  files: any;
  folders: any;
  project_id: any;
  match: any;
}

const FilesHomePage: FC<Props> = ({ files, folders, project_id, match }) => {
  const dispatch = useDispatch();
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
    dispatch(createFolder({ title: newFolder, project_id: project_id }));
    setIsFolderModalVisible(false);
  };

  return (
    <div>
      <div className="files">
        <div className="files__data">
          <FolderList files={files} folders={folders} showModal={showModal} match={match} />
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
