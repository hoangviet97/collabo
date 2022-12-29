import React, { FC } from "react";
import { Tag, Divider } from "antd";
import { useParams } from "react-router-dom";
import { deleteTag } from "../../redux/actions/tag";
import { useDispatch } from "react-redux";
import { tag } from "../../types/types";

interface Props {
  title: String;
  tags: tag[];
}

const TagGroup: FC<Props> = ({ title, tags }) => {
  const dispatch = useDispatch();
  let params: any = useParams();

  const deleteHandler = (id: string) => {
    dispatch(deleteTag(params.id, id));
  };

  return (
    <div style={{ margin: "18px 0" }}>
      <Divider />
      <h2 style={{ fontSize: "35px", color: "grey" }}>{title}</h2>
      {tags.map((i: tag, index: number) => (
        <Tag key={index} color="cyan" style={{ fontSize: "18px", padding: "6px" }} onClose={() => deleteHandler(i.id)} closable>
          #{i.name}
        </Tag>
      ))}
    </div>
  );
};

export default TagGroup;
