import React, { useState, useRef } from "react";
import Container from "../../../utils/Container";
import { Form, Button, Row, Col, Input } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";

const NewFileForm = (props) => {
  const API_URL = "http://localhost:9000/api/files/upload";
  const [file, setFile] = useState(null); // state for storing actual image
  const [state, setState] = useState({
    title: "",
    description: ""
  });
  const dropRef = useRef();
  const { TextArea } = Input;
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("project_id", props.project_id);
        formData.append("description", description);
        setErrorMsg("");

        await axios.post(`${API_URL}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        setErrorMsg("Please select a file to add.");
      }
    } catch (error) {
      error.response && console.log(error.response.data);
    }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  };

  return (
    <div className="files__upload" style={{ width: "100%" }}>
      <Form className="search-form" layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item label="Title (optional)">
              <Input placeholder="Enter title" name="title" value={state.title || ""} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Description (optional)">
              <TextArea rows={4} placeholder="Enter description" name="description" value={state.description || ""} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="upload-section" style={{ display: "flex", width: "100%" }}>
              <Dropzone onDrop={onDrop} onDragEnter={() => updateBorder("over")} onDragLeave={() => updateBorder("leave")}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "drop-zone" })} style={{ width: "100%", padding: "30px 30px", height: "inherit", border: "0.5px solid black", display: "flex", justifyContent: "center", alignItems: "center" }} ref={dropRef}>
                    <div class="drop-container">
                      <input {...getInputProps()} />
                      <p>Drag and drop a file OR click here to select a file</p>
                      {file && (
                        <div>
                          <strong>Selected file:</strong> {file.name}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Col>
        </Row>
        {errorMsg}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={handleOnSubmit} type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewFileForm;
