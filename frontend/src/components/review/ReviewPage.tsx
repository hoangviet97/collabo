import React, { FC } from "react";
import Container from "../utils/Container";
import ReviewContent from "./ReviewContent";
import ReviewControlPanel from "./ReviewControlPanel";

interface Props {
  match: any;
}

const ReviewPage: FC<Props> = ({ match }) => {
  return (
    <Container size="30">
      <div className="review" style={{ minHeight: "calc(100vh - 120px)" }}>
        <ReviewControlPanel match={match} />
        <ReviewContent match={match} />
      </div>
    </Container>
  );
};

export default ReviewPage;
