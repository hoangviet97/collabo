import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteReview, acceptReview } from "../../redux/actions/review";
import { useParams } from "react-router-dom";
import { getFilesByReview, getFilesByTask } from "../../redux/actions/file";
import FileMiniCard from "../documents/files/FileMiniCard";
import moment from "moment";

interface Props {
  review: any;
}

const Review: FC<Props> = ({ review }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [comment, setComment] = useState<string>("");
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  const [showFileButton, setShowFileButton] = useState<boolean>(true);
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(getFilesByTask(review.task_id, params.id));
  }, []);

  const deleteHandler = () => {
    dispatch(deleteReview(params.id, review.review_id, review.task_id, review.member_id, comment));
  };

  const acceptHandler = () => {
    dispatch(acceptReview(params.id, review.review_id, review.task_id, review.member_id, comment));
  };

  const saveCommentHandler = () => {
    setIsCommentVisible(false);
  };

  const onBlurComment = () => {
    setIsCommentVisible(false);
  };

  const filesHandler = () => {
    setShowFileButton(false);
    dispatch(getFilesByReview(review.id, review.task_id, params.id));
  };

  return (
    <div className="review__item">
      <header className="review__header">
        <div className="review__title">
          <span style={{ color: "#747d8c" }}>{review.section_name}</span>
          <span style={{ fontSize: "23px" }}>{review.title}</span>
        </div>
        <div className="review__title">
          <span style={{ color: "#747d8c", alignSelf: "flex-end" }}>Submitted</span>
          <span style={{ fontSize: "12px" }}>{moment(review.created_at).calendar()}</span>
        </div>
      </header>
      <div className="review__files">
        <Button onClick={filesHandler} type="link" style={{ padding: 0 }}>
          Show all files
        </Button>
        <div className="review__file-list">{review.files && review.files.map((item: any) => <FileMiniCard data={item} task_id={review.task_id} deleteProp={false} bordered={true} />)}</div>
      </div>
      <div className="review__body">
        {isCommentVisible && (
          <div style={{ margin: "10px 0" }}>
            <TextArea rows={4} value={comment} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)} onBlur={onBlurComment} autoFocus />
          </div>
        )}
      </div>
      <div className="review__footer">
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
