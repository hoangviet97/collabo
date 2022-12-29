import React, { useState, FC, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { createAssignee, deleteAssignee } from "../../redux/actions/task";
import { addParticipant, deleteParticipant } from "../../redux/actions/session";
import { Row, Col, Input, Avatar, Button, Divider } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import { CloseCircleOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useParams, useLocation } from "react-router-dom";
import { member } from "../../types/types";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  item_id: string;
  assignees: any;
  members: member[];
  close: any;
  type: string;
}

const AssigneesModal: FC<Props> = ({ item_id, assignees, members, close, type }) => {
  const dispatch = useDispatch();
  const loc = useLocation();
  const params: any = useParams();
  const [searchText, setSearchText] = useState<string>("");

  const path = loc.pathname.split("/");

  const searchTextHandle = (e: any) => {
    setSearchText(e.target.value);
  };

  const addNewAssignee = (id: string) => {
    if (type === "task") {
      dispatch(createAssignee(id, item_id, params.id));
    } else {
      dispatch(addParticipant(id, item_id, path[1]));
    }
  };

  const removeAssignee = (id: string, email: string) => {
    if (type === "task") {
      dispatch(deleteAssignee(id, item_id, params.id));
    } else {
      dispatch(deleteParticipant(id, item_id, path[1], email));
    }
  };

  const isAssigneed = (email: string, id: string) => {
    const searcher = assignees.filter((i: any) => i.email === email);

    if (searcher.length > 0) {
      return (
        <a onClick={() => removeAssignee(id, email)}>
          <CheckCircleOutlined />
        </a>
      );
    } else {
      return (
        <a onClick={() => addNewAssignee(id)}>
          <PlusOutlined />
        </a>
      );
    }
  };

  return (
    <>
      <div className="assignee-modal">
        <Row style={{ marginBottom: "10px" }}>
          <Col span="18">
            <Input size="small" value={searchText} onChange={(e: ChangeEvent<HTMLInputElement>) => searchTextHandle(e)} />
          </Col>
          <Col span="6" className="assignee-modal__col">
            <a onClick={close}>
              <CloseCircleOutlined style={{ color: "crimson", fontSize: "18px" }} />
            </a>
          </Col>
        </Row>
        <div className="assignee-modal__members">
          {members
            .filter((i: member) => {
              return i.firstname.toLowerCase().includes(searchText.toLowerCase()) || i.lastname.toLowerCase().includes(searchText.toLowerCase()) || i.email.toLowerCase().includes(searchText.toLowerCase());
            })
            .map((item: member, index: number) => (
              <div className="assignee-modal__item" key={index}>
                <div className="assignee-modal__identity">
                  <Avatar style={{ backgroundColor: item.color === null || item.color.length < 1 ? color.normal_orange : item.color }}>
                    <AvatarIcon firstname={item.firstname} lastname={item.lastname} />
                  </Avatar>{" "}
                  <span>{item.lastname}</span>
                </div>
                {isAssigneed(item.email, item.user_id)}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AssigneesModal;
