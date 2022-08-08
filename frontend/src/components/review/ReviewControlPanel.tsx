import React, { FC } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { getMembers } from "../../actions/member";
import { getReviewPanel } from "../../actions/review";
import { member } from "../../types/types";
import ReviewLink from "./ReviewLink";

interface Props {
  match: any;
}

const ReviewControlPanel: FC<Props> = ({ match }) => {
  const reviewMembers = useSelector((state: RootStateOrAny) => state.review.review_panel);

  return (
    <div className="review__panel">
      <h2>Reviews</h2>
      <div style={{ marginTop: "30px" }}>
        {reviewMembers.map((member: any) => (
          <ReviewLink member={member} match={match} />
        ))}
      </div>
    </div>
  );
};

export default ReviewControlPanel;
