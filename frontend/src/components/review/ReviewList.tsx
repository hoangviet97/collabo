import React, { useEffect } from "react";
import Review from "./Review";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews } from "../../actions/review";
import { Empty } from "antd";

const ReviewList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootStateOrAny) => state.review.reviews);
  const params: any = useParams();

  useEffect(() => {
    dispatch(getReviews({ project_id: params.id, member_id: params.memberId }));
  }, [params.memberId]);
  return (
    <div>
      {reviews.length < 1 ? (
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: "15px" }}>
          <Empty />
        </div>
      ) : (
        reviews.map((item: any) => <Review review={item} />)
      )}
    </div>
  );
};

export default ReviewList;
