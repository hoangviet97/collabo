import React, { FC } from "react";
import { Tag, Divider } from "antd";
import { deleteTag } from "../../actions/tag";
import { useDispatch } from "react-redux";

interface Props {
  title: String;
  tags: any;
}

const TagGroup: FC<Props> = ({ title, tags }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id: String) => {
    dispatch(deleteTag({ id: id }));
  };

  return (
    <div style={{ margin: "18px 0" }}>
      <Divider />
      <h2 style={{ fontSize: "35px", color: "grey" }}>{title}</h2>
      {tags.map((i: any) => (
        <Tag color="cyan" style={{ fontSize: "18px", padding: "6px" }} onClose={() => deleteHandler(i.id)} closable>
          #{i.name}
        </Tag>
      ))}
    </div>
  );
};

export default TagGroup;
