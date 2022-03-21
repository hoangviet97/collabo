import React, { useState, useEffect } from "react";
import Container from "../utils/Container";
import { Button, Modal, Form, Input } from "antd";
import TagGroup from "./TagGroup";
import { useDispatch, useSelector } from "react-redux";
import { createTag, getTags } from "../../actions/tag";

const Tags = ({ match }) => {
  const groupList = [
    { title: "A", list: [] },
    { title: "B", list: [] },
    { title: "C", list: [] },
    { title: "D", list: [] },
    { title: "E", list: [] },
    { title: "F", list: [] },
    { title: "G", list: [] },
    { title: "H", list: [] },
    { title: "I", list: [] },
    { title: "J", list: [] },
    { title: "K", list: [] },
    { title: "L", list: [] },
    { title: "M", list: [] },
    { title: "N", list: [] },
    { title: "O", list: [] },
    { title: "P", list: [] },
    { title: "Q", list: [] },
    { title: "R", list: [] },
    { title: "S", list: [] },
    { title: "T", list: [] },
    { title: "U", list: [] },
    { title: "V", list: [] },
    { title: "W", list: [] },
    { title: "X", list: [] },
    { title: "Y", list: [] },
    { title: "Z", list: [] }
  ];
  const [modalvisible, setModalVisible] = useState(false);
  const [tagName, setTagName] = useState("");
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.tags);

  const createTagHandler = () => {
    dispatch(createTag({ project: match.params.id, name: tagName, color: "green" }));
  };

  useEffect(() => {
    dispatch(getTags({ project: match.params.id }));
  }, []);

  return (
    <Container size="30">
      <div>
        <header>
          <Button type="primary" onClick={() => setModalVisible((prev) => !prev)}>
            Add new tag
          </Button>
        </header>
        <div class="tag__groups">
          {groupList.map((i) => {
            const letter = i.title;
            console.log(letter.toLocaleLowerCase());
            const tagslist = tags.filter((x) => x.name.charAt(0) === i.title.toLocaleLowerCase());
            return <TagGroup title={i.title} tags={tagslist} />;
          })}
        </div>
        <Modal title="Tag" width="500px" visible={modalvisible} onCancel={() => setModalVisible(false)} footer={null}>
          <Form>
            <Form.Item>
              <Input value={tagName} onChange={(e) => setTagName(e.target.value)} placeholder="Name" />
            </Form.Item>
            <Form.Item>
              <Button onClick={createTagHandler}>Create</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Container>
  );
};

export default Tags;
