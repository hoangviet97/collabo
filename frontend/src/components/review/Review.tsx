import React, { FC, useEffect } from "react";
import { Divider, Button, Tag } from "antd";
import { useDispatch } from "react-redux";
import { deleteReview, acceptReview } from "../../actions/review";
import { useParams } from "react-router-dom";
import { getFilesByTask } from "../../actions/file";

interface Props {
  review: any;
}

const Review: FC<Props> = ({ review }) => {
  const dispatch = useDispatch();
  const params: any = useParams();

  useEffect(() => {
    dispatch(getFilesByTask({ id: review.task_id, project_id: params.id }));
  }, []);

  const deleteHandler = () => {
    dispatch(deleteReview({ project_id: params.id, id: review.review_id, task_id: review.task_id, member_id: review.member_id }));
  };

  const acceptHandler = () => {
    dispatch(acceptReview({ project_id: params.id, id: review.review_id, task_id: review.task_id, member_id: review.member_id }));
  };

  return (
    <div className="review__item">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="review__title">
          <span style={{ color: "#747d8c" }}>{review.section_name}</span>
          <span style={{ fontSize: "17px" }}>{review.title}</span>
        </div>
        <div>
          <Tag color="magenta">{review.priorityName}</Tag>
          <div>{review.member_id}</div>
        </div>
      </header>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <Button type="link" danger style={{ borderRadius: "8px" }} onClick={deleteHandler}>
            Return
          </Button>
          <Button type="primary" style={{ borderRadius: "8px" }} onClick={acceptHandler}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
