import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Space, Dropdown, Menu, Typography, Modal, Button, Select, message } from "antd";
import moment from "moment";
import axiosClient from "../../../helpers/axios";
import { EllipsisOutlined } from "@ant-design/icons";
import { moveToFolder, deleteFile } from "../../../redux/actions/file";
import fileDownload from "js-file-download";
import { useParams } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { folder } from "../../../types/types";
import { AppDispatch } from "../../../redux/store";

const FileList: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const { Text, Link } = Typography;
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>("");
  const [folderId, setFolderId] = useState<string>("");
  const folders = useSelector((state: RootStateOrAny) => state.folder.folders);
  const files = useSelector((state: RootStateOrAny) => state.file.files);

  const download = (record: any) => {
    axiosClient({
      url: `https://collaboatbe.herokuapp.com/api/${params.id}/files/${record.id}/download`, //your url
      method: "GET",
      responseType: "blob" // important
    }).then((response) => {
      fileDownload(response.data, `${record.title}.${record.file_mimetype}`);
    });
  };

  const deleteHandler = (id: string) => {
    dispatch(deleteFile(params.id, id));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: any) => <a>{text}</a>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created",
      render: (text: any, record: any) => moment(record.created_at).format("MMM Do YY, h:mm")
    },
    {
      title: "",
      key: "download",
      width: "12%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Dropdown overlay={() => menu(record)} trigger={["click"]}>
            <a>
              <EllipsisOutlined style={{ fontSize: "20px" }} />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ];

  const handleModalInfo = (id: string) => {
    setIsModalVisible(true);
    setFileId(id);
  };

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => download(record)}>Download</a>
      </Menu.Item>
      <Menu.Item onClick={() => handleModalInfo(record.id)} key="1">
        <Text>Move to folder</Text>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={() => deleteHandler(record.id)}>Delete</a>
      </Menu.Item>
    </Menu>
  );

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFolderName = (value: string) => {
    setFolderId(value);
  };

  const submitHandle = () => {
    dispatch(moveToFolder(params.id, fileId, folderId));
    setFolderId("");
    setFileId("");
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="files-container">
        <Table columns={columns} dataSource={files} pagination={{ pageSize: 10 }} />
      </div>
      <Modal title="Select folder" width="500px" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Select style={{ width: 200 }} onChange={handleFolderName} placeholder="Select a person">
          {folders.map((item: folder, index: number) => (
            <Option key={index} value={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
        <Button onClick={submitHandle}>Move</Button>
      </Modal>
    </>
  );
};

export default FileList;
