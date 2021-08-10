import React, { useState, useRef } from "react";
import Container from "../../../utils/Container";
import { Tabs, Form, Button, Row, Col, Input } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";

const NewFileForm = () => {
  const API_URL = "http://localhost:9000/api/files/upload";
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [state, setState] = useState({
    title: "",
    description: ""
  });
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef();

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
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("description", description);

          await axios.post(`${API_URL}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
        } else {
          console.log("Please select a file to add.");
        }
      } else {
        console.log("Please enter all the field values.");
      }
    } catch (error) {
      error.response && console.log(error.response.data);
    }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  return (
    <div className="documents">
      <Container size="30">
        <Form className="search-form">
          <Row>
            <Form.Item label="title">
              <Input placeholder="Enter title" name="title" value={state.title || ""} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="description">
              <Input placeholder="Enter description" name="description" value={state.description || ""} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button onClick={handleOnSubmit} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Row>
          <div className="upload-section">
            <Dropzone onDrop={onDrop} onDragEnter={() => updateBorder("over")} onDragLeave={() => updateBorder("leave")}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                  <input {...getInputProps()} />
                  <p>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {previewSrc ? (
              isPreviewAvailable ? (
                <div className="image-preview">
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
              </div>
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default NewFileForm;
