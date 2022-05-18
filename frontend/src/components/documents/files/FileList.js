import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Space, Dropdown, Menu, Typography, Modal, Button, Select, message } from "antd";
import moment from "moment";
import axios from "axios";
import { EllipsisOutlined } from "@ant-design/icons";
import { moveToFolder, deleteFile } from "../../../actions/file";
import fileDownload from "js-file-download";

const FileList = (props) => {
  const dispatch = useDispatch();
  const { Text, Link } = Typography;
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileId, setFileId] = useState("");
  const [folderId, setFolderId] = useState("");
  const [clearedFiles, setClearedFiles] = useState([]);

  useEffect(() => {
    const arr = props.files.filter((item) => item.folders_id === null);
    setClearedFiles(arr);
  }, [props.files]);

  const download = (record) => {
    axios({
      url: `http://localhost:9000/api/files/download/${record.id}`, //your url
      method: "GET",
      responseType: "blob" // important
    }).then((response) => {
      console.log(response);
      fileDownload(response.data, `${record.title}.${record.file_mimetype}`);
    });
  };

  const deleteHandler = (id) => {
    dispatch(deleteFile({ id: id }));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>
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
      render: (text, record) => moment(record.created_at).startOf("hour").fromNow()
    },
    {
      title: "",
      key: "download",
      width: "12%",
      render: (text, record) => (
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

  const handleModalInfo = (id) => {
    setIsModalVisible(true);
    setFileId(id);
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => download(record)}>Download</a>
      </Menu.Item>
      <Menu.Item onClick={() => handleModalInfo(record.id)} key="1">
        <Text>Move to folder</Text>
      </Menu.Item>
      <Menu.Item key="2">
        <Text type="danger" onClick={deleteHandler(record.id)}>
          Delete
        </Text>
      </Menu.Item>
    </Menu>
  );

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFolderName = (value) => {
    setFolderId(value);
  };

  const submitHandle = () => {
    dispatch(moveToFolder({ id: fileId, folder_id: folderId }));
    setFolderId(0);
    setFileId(0);
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="files-container">
        <Table columns={columns} dataSource={clearedFiles} pagination={{ pageSize: 10 }} />
      </div>
      <Modal title="Select folder" width="500px" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Select style={{ width: 200 }} onChange={handleFolderName} placeholder="Select a person">
          {props.folders.map((item) => (
            <Option value={item.id}>{item.title}</Option>
          ))}
        </Select>
        <Button onClick={submitHandle}>Move</Button>
      </Modal>
    </>
  );
};

export default FileList;
