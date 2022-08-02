import React, { FC, useEffect, useState } from "react";
import { Input, Button, Tag } from "antd";
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
  const [comment, setComment] = useState("");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(getFilesByTask({ id: review.task_id, project_id: params.id }));
  }, []);

  const deleteHandler = () => {
    console.log(comment);
    dispatch(deleteReview({ project_id: params.id, id: review.review_id, task_id: review.task_id, member_id: review.member_id, comment: comment }));
  };

  const acceptHandler = () => {
    dispatch(acceptReview({ project_id: params.id, id: review.review_id, task_id: review.task_id, member_id: review.member_id, comment: comment }));
  };

  const saveCommentHandler = () => {
    setIsCommentVisible(false);
  };

  const onBlurComment = () => {
    setIsCommentVisible(false);
  };

  return (
    <div className="review__item">
      <header className="review__title">
        <span style={{ color: "#747d8c" }}>{review.section_name}</span>
        <span style={{ fontSize: "23px" }}>{review.title}</span>
      </header>
      <div className="review__body">
        {isCommentVisible && (
          <div style={{ margin: "10px 0" }}>
            <TextArea rows={4} onChange={(e) => setComment(e.target.value)} onBlur={onBlurComment} autoFocus />
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="review__body">{isCommentVisible === false ? <Button onClick={() => setIsCommentVisible(true)}>{comment.length > 0 ? "Edit" : "Add"} comment</Button> : <Button onClick={saveCommentHandler}>Save comment</Button>}</div>
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
