import React, { useState, useEffect, FC, ChangeEvent } from "react";
import Container from "../../components/utils/Container";
import { Button, Modal, Form, Input, Spin } from "antd";
import TagGroup from "../../components/tagGroup/TagGroup";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { createTag, getTags } from "../../redux/actions/tag";
import { tag } from "../../types/types";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const TagsPage: React.FunctionComponent = () => {
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
  const [modalvisible, setModalVisible] = useState<boolean>(false);
  const [tagName, setTagName] = useState<string>("");
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const tags = useSelector((state: RootStateOrAny) => state.tag.tags);
  const loading = useSelector((state: RootStateOrAny) => state.tag.loading);

  const createTagHandler = () => {
    dispatch(createTag(params.id, tagName.toLocaleLowerCase(), "green"));
  };

  useEffect(() => {
    dispatch(getTags(params.id));
  }, []);

  return (
    <Container size="50">
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
            {groupList.map((i, index: number) => {
              const letter = i.title;
              const tagslist = tags.filter((x: tag) => x.name.charAt(0) === i.title.toLocaleLowerCase());
              return <TagGroup key={index} title={i.title} tags={tagslist} />;
            })}
          </div>
        )}
        <Modal title="Tag" width="500px" visible={modalvisible} onCancel={() => setModalVisible(false)} footer={null}>
          <Form>
            <Form.Item>
              <Input value={tagName} onChange={(e: ChangeEvent<HTMLInputElement>) => setTagName(e.target.value)} placeholder="Name" />
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

export default TagsPage;
