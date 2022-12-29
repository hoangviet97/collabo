import React, { FC } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
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
        {reviewMembers.map((member: any, index: number) => (
          <ReviewLink key={index} member={member} match={match} />
        ))}
      </div>
    </div>
  );
};

export default ReviewControlPanel;
