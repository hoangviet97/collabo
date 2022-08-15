import React, { useEffect } from "react";
import Review from "./Review";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews } from "../../actions/review";
import { Empty } from "antd";

const ReviewList: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootStateOrAny) => state.review.reviews);
  const params: any = useParams();

  useEffect(() => {
    dispatch(getReviews(params.id, params.memberId));
  }, [params.memberId]);
  return (
    <div>
      {reviews.length < 1 ? (
        <div className="review__empty">
          <Empty />
        </div>
      ) : (
        reviews.map((item: any) => <Review review={item} />)
      )}
    </div>
  );
};

export default ReviewList;
