import React, { useState, useEffect, FC } from "react";
import Container from "../utils/Container";
import { Button, Modal, Form, Input, Spin } from "antd";
import TagGroup from "./TagGroup";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { createTag, getTags } from "../../actions/tag";
import { tag } from "../../types/types";

interface Props {
  match: any;
}

const Tags: FC<Props> = ({ match }) => {
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
  const [tagName, setTagName] = useState<string>("");
  const dispatch = useDispatch();
  const tags = useSelector((state: RootStateOrAny) => state.tag.tags);
  const loading = useSelector((state: RootStateOrAny) => state.tag.loading);

  const createTagHandler = () => {
    dispatch(createTag({ project_id: match.params.id, name: tagName.toLocaleLowerCase(), color: "green" }));
  };

  useEffect(() => {
    dispatch(getTags({ project_id: match.params.id }));
  }, []);

  return (
    <Container size="30">
      <div>
        <header>
          <Button type="primary" onClick={() => setModalVisible((prev) => !prev)}>
            Add new tag
          </Button>
        </header>
        {loading ? (
          <Spin />
        ) : (
          <div className="tag__groups">
            {groupList.map((i) => {
              const letter = i.title;
              const tagslist = tags.filter((x: tag) => x.name.charAt(0) === i.title.toLocaleLowerCase());
              return <TagGroup title={i.title} tags={tagslist} />;
            })}
          </div>
        )}
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
